const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const STATIC_FILES = {
    "/": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/index.html": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/Extensao.html": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/css.css": { file: "css.css", type: "text/css; charset=utf-8" },
    "/js.js": { file: "js.js", type: "application/javascript; charset=utf-8" }
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end(JSON.stringify(payload));
}

async function serveStaticFile(res, pathname) {
    const entry = STATIC_FILES[pathname];

    if (!entry) {
        return false;
    }

    const filePath = path.join(__dirname, entry.file);
    const contents = await fs.readFile(filePath);

    res.writeHead(200, {
        "Content-Type": entry.type
    });
    res.end(contents);
    return true;
}

function buildSummaryPrompt(sourceText, translatedText, sourceLanguage, targetLanguage, uiLanguage) {
    return `
Voce e um tradutor especialista em contexto, dicionario e conversacao.

Tarefa:
- Receber um texto original no idioma "${sourceLanguage}" e sua traducao completa no idioma "${targetLanguage}".
- Considerar a traducao final como a frase principal para a conversa simulada.
- Interpretar o contexto do texto inteiro, nao apenas falas entre aspas.
- Explicar o sentido principal.
- Informar o tom: formal, neutro ou informal.
- Sugerir sinonimos ou variacoes.
- Simular uma conversa curta com 2 falas.

Regras importantes:
- O campo "translation" deve conter a traducao completa final.
- Os campos "meaning", "context", "synonyms" e "tone" devem ser escritos no idioma da interface "${uiLanguage}".
- Os campos "meaning", "context" e "synonyms" devem explicar essa traducao final, sem inverter para a frase original.
- A conversa deve usar a traducao final como base.
- Cada item de "conversation" deve trazer "message" na lingua final e "translation" explicando o significado para quem estiver lendo.
- Nao ignore narracao, descricao, paragrafos ou trechos fora de aspas.

Responda somente em JSON valido com este formato:
{
  "translation": "string",
  "meaning": "string",
  "context": "string",
  "synonyms": "string",
  "tone": "string",
  "conversation": [
    { "speaker": "Pessoa A", "message": "string", "translation": "string" },
    { "speaker": "Pessoa B", "message": "string", "translation": "string" }
  ]
}

Texto original:
${sourceText}

Traducao completa:
${translatedText}
`.trim();
}

function parseJsonText(text) {
    const normalized = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
    return JSON.parse(normalized);
}

function createExcerpt(text, maxLength = 4000) {
    const normalized = String(text || "").trim();

    if (normalized.length <= maxLength) {
        return normalized;
    }

    return `${normalized.slice(0, maxLength)}\n\n[trecho resumido para analise]`;
}

function splitLongText(text, maxChunkLength = 2200) {
    const normalized = String(text || "").replace(/\r\n/g, "\n");

    if (normalized.length <= maxChunkLength) {
        return [normalized];
    }

    const paragraphs = normalized.split(/\n{2,}/);
    const chunks = [];
    let currentChunk = "";

    for (const paragraph of paragraphs) {
        const candidate = currentChunk ? `${currentChunk}\n\n${paragraph}` : paragraph;

        if (candidate.length <= maxChunkLength) {
            currentChunk = candidate;
            continue;
        }

        if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = "";
        }

        if (paragraph.length <= maxChunkLength) {
            currentChunk = paragraph;
            continue;
        }

        const sentences = paragraph.match(/[^.!?]+[.!?"]*\s*|.+$/g) || [paragraph];
        let sentenceChunk = "";

        for (const sentence of sentences) {
            const sentenceCandidate = sentenceChunk ? `${sentenceChunk}${sentence}` : sentence;

            if (sentenceCandidate.length <= maxChunkLength) {
                sentenceChunk = sentenceCandidate;
                continue;
            }

            if (sentenceChunk) {
                chunks.push(sentenceChunk.trim());
            }

            if (sentence.length <= maxChunkLength) {
                sentenceChunk = sentence;
                continue;
            }

            for (let index = 0; index < sentence.length; index += maxChunkLength) {
                chunks.push(sentence.slice(index, index + maxChunkLength).trim());
            }

            sentenceChunk = "";
        }

        if (sentenceChunk) {
            currentChunk = sentenceChunk.trim();
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks.filter(Boolean);
}

async function callGeminiApi(parts, responseMimeType = "application/json") {
    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY nao configurada.");
    }

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts
                    }
                ],
                generationConfig: {
                    temperature: 0.4,
                    responseMimeType
                }
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini retornou erro: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("A API do Gemini nao retornou texto.");
    }

    return text;
}

function buildTranslationPrompt(chunkText, sourceLanguage, targetLanguage) {
    return `
Voce e um tradutor profissional.

Traduzir do idioma "${sourceLanguage}" para "${targetLanguage}".

Regras:
- Traduzir o texto inteiro, do inicio ao fim.
- Nao resumir.
- Nao omitir narracao, paragrafos, descricoes ou trechos fora de aspas.
- Traduzir tambem tudo que estiver entre aspas.
- Preservar a ordem, os paragrafos e a estrutura do texto.
- Priorizar traducao natural e contextual, nao traducao palavra por palavra.
- Quando houver expressoes idiomaticas, girias, ironia ou subtexto, usar o equivalente mais natural no idioma de destino.
- Evitar traducao literal quando isso soar artificial ou mudar a intencao do texto.
- Responder somente com a traducao pronta, sem comentarios extras.

Texto:
${chunkText}
`.trim();
}

async function translateFullText(sourceText, sourceLanguage, targetLanguage) {
    const chunks = splitLongText(sourceText);
    const translatedChunks = [];

    for (const chunk of chunks) {
        const translatedChunk = await callGeminiApi(
            [
                {
                    text: buildTranslationPrompt(chunk, sourceLanguage, targetLanguage)
                }
            ],
            "text/plain"
        );

        translatedChunks.push(translatedChunk.trim());
    }

    return translatedChunks.join("\n\n");
}

async function callGemini(sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    const translatedText = await translateFullText(sourceText, sourceLanguage, targetLanguage);
    const sourceExcerpt = createExcerpt(sourceText);
    const translatedExcerpt = createExcerpt(translatedText);
    const summaryText = await callGeminiApi([
        {
            text: buildSummaryPrompt(sourceExcerpt, translatedExcerpt, sourceLanguage, targetLanguage, uiLanguage)
        }
    ]);
    const parsed = parseJsonText(summaryText);

    return {
        provider: `Gemini API (${GEMINI_MODEL})`,
        detected: sourceLanguage,
        target: targetLanguage,
        translation: translatedText,
        meaning: parsed.meaning,
        context: parsed.context,
        synonyms: parsed.synonyms,
        tone: parsed.tone,
        conversation: parsed.conversation
    };
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "OPTIONS") {
        sendJson(res, 204, {});
        return;
    }

    if (req.method === "GET" && url.pathname === "/health") {
        sendJson(res, 200, {
            ok: true,
            apiKeyConfigured: Boolean(API_KEY),
            provider: "Gemini API",
            model: GEMINI_MODEL
        });
        return;
    }

    if (req.method === "GET" && (url.pathname === "/" || STATIC_FILES[url.pathname])) {
        try {
            const served = await serveStaticFile(res, url.pathname);

            if (served) {
                return;
            }
        } catch (error) {
            sendJson(res, 500, {
                error: "Falha ao servir o frontend."
            });
            return;
        }

        return;
    }

    if (req.method === "POST" && url.pathname === "/translate") {
        let rawBody = "";

        req.on("data", (chunk) => {
            rawBody += chunk;
        });

        req.on("end", async () => {
            try {
                const body = JSON.parse(rawBody || "{}");
                const result = await callGemini(
                    body.sourceText || "",
                    body.sourceLanguage || "auto",
                    body.targetLanguage || "en",
                    body.uiLanguage || body.targetLanguage || "pt"
                );

                sendJson(res, 200, result);
            } catch (error) {
                sendJson(res, 500, {
                    error: error.message
                });
            }
        });

        return;
    }

    sendJson(res, 404, { error: "Rota nao encontrada." });
});

server.listen(PORT, () => {
    console.log(`Servidor local da extensao rodando em http://localhost:${PORT}`);
});
