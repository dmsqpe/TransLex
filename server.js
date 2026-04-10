const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const GITHUB_MODELS_TOKEN = process.env.GITHUB_MODELS_TOKEN || process.env.COPILOT_FALLBACK_TOKEN || "";
const GITHUB_MODELS_MODEL = process.env.GITHUB_MODELS_MODEL || process.env.COPILOT_FALLBACK_MODEL || "openai/gpt-4.1-mini";
const GITHUB_MODELS_ENDPOINT = process.env.GITHUB_MODELS_ENDPOINT || "https://models.github.ai/inference/chat/completions";
const USAGE_FILE = path.join(__dirname, "usage-stats.json");
const STATIC_FILES = {
    "/": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/index.html": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/Extensao.html": { file: "Extensao.html", type: "text/html; charset=utf-8" },
    "/css.css": { file: "css.css", type: "text/css; charset=utf-8" },
    "/js.js": { file: "js.js", type: "application/javascript; charset=utf-8" },
    "/site.webmanifest": { file: "site.webmanifest", type: "application/manifest+json; charset=utf-8" }
};

const STATIC_ICON_TYPES = {
    ".png": "image/png",
    ".ico": "image/x-icon"
};

const usageStats = {
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalTranslationRequests: 0,
    completedTranslationRequests: 0,
    failedTranslationRequests: 0,
    fallbackActivations: {
        geminiToGroq: 0,
        geminiToGithubModels: 0,
        groqToGithubModels: 0
    },
    providers: {
        gemini: createProviderUsage(),
        groq: createProviderUsage(),
        githubModels: createProviderUsage()
    },
    lastErrors: []
};

let usageSaveTimer = null;

function createProviderUsage() {
    return {
        attempts: 0,
        successes: 0,
        failures: 0,
        apiCalls: 0,
        lastUsedAt: null,
        lastSuccessAt: null,
        lastFailureAt: null
    };
}

function mergeUsageStats(savedStats) {
    if (!savedStats || typeof savedStats !== "object") {
        return;
    }

    usageStats.startedAt = savedStats.startedAt || usageStats.startedAt;
    usageStats.totalTranslationRequests = Number(savedStats.totalTranslationRequests || 0);
    usageStats.completedTranslationRequests = Number(savedStats.completedTranslationRequests || 0);
    usageStats.failedTranslationRequests = Number(savedStats.failedTranslationRequests || 0);
    usageStats.lastErrors = Array.isArray(savedStats.lastErrors) ? savedStats.lastErrors.slice(0, 12) : [];

    for (const key of Object.keys(usageStats.fallbackActivations)) {
        usageStats.fallbackActivations[key] = Number(savedStats.fallbackActivations?.[key] || 0);
    }

    for (const key of Object.keys(usageStats.providers)) {
        usageStats.providers[key] = {
            ...usageStats.providers[key],
            ...(savedStats.providers?.[key] || {})
        };
    }

    usageStats.updatedAt = new Date().toISOString();
}

async function loadUsageStats() {
    try {
        const raw = await fs.readFile(USAGE_FILE, "utf8");
        mergeUsageStats(JSON.parse(raw));
    } catch (error) {
        // Sem arquivo ainda; os contadores comecam do zero.
    }
}

function scheduleUsageSave() {
    usageStats.updatedAt = new Date().toISOString();

    if (usageSaveTimer) {
        clearTimeout(usageSaveTimer);
    }

    usageSaveTimer = setTimeout(async () => {
        try {
            await fs.writeFile(USAGE_FILE, JSON.stringify(usageStats, null, 2));
        } catch (error) {
            console.error("Falha ao salvar usage-stats.json:", error.message);
        }
    }, 250);
}

function markProviderAttempt(providerKey) {
    const provider = usageStats.providers[providerKey];
    provider.attempts += 1;
    provider.lastUsedAt = new Date().toISOString();
    scheduleUsageSave();
}

function markProviderSuccess(providerKey) {
    const provider = usageStats.providers[providerKey];
    provider.successes += 1;
    provider.lastSuccessAt = new Date().toISOString();
    scheduleUsageSave();
}

function markProviderFailure(providerKey, error) {
    const provider = usageStats.providers[providerKey];
    provider.failures += 1;
    provider.lastFailureAt = new Date().toISOString();
    usageStats.lastErrors.unshift({
        provider: providerKey,
        message: error.message,
        at: new Date().toISOString()
    });
    usageStats.lastErrors = usageStats.lastErrors.slice(0, 12);
    scheduleUsageSave();
}

function markProviderApiCall(providerKey) {
    usageStats.providers[providerKey].apiCalls += 1;
    scheduleUsageSave();
}

function getPublicUsageStats() {
    return {
        ...usageStats,
        configured: {
            gemini: Boolean(API_KEY),
            groq: Boolean(GROQ_API_KEY),
            githubModels: Boolean(GITHUB_MODELS_TOKEN)
        },
        models: {
            gemini: GEMINI_MODEL,
            groq: GROQ_MODEL,
            githubModels: GITHUB_MODELS_MODEL
        }
    };
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function providerCard(title, providerKey, stats) {
    const provider = stats.providers[providerKey];
    const configured = stats.configured[providerKey] ? "Configurado" : "Nao configurado";
    const configuredClass = stats.configured[providerKey] ? "ok" : "warn";

    return `
        <article class="card">
            <div class="card-head">
                <h2>${escapeHtml(title)}</h2>
                <span class="pill ${configuredClass}">${configured}</span>
            </div>
            <p class="model">${escapeHtml(stats.models[providerKey])}</p>
            <dl>
                <div><dt>Tentativas</dt><dd>${provider.attempts}</dd></div>
                <div><dt>Sucessos</dt><dd>${provider.successes}</dd></div>
                <div><dt>Falhas</dt><dd>${provider.failures}</dd></div>
                <div><dt>Chamadas API</dt><dd>${provider.apiCalls}</dd></div>
            </dl>
            <p class="muted">Ultimo sucesso: ${escapeHtml(provider.lastSuccessAt || "Nunca")}</p>
            <p class="muted">Ultima falha: ${escapeHtml(provider.lastFailureAt || "Nunca")}</p>
        </article>
    `;
}

function buildUsagePage() {
    const stats = getPublicUsageStats();
    const lastErrors = stats.lastErrors.length
        ? stats.lastErrors.map((error) => `
            <li>
                <strong>${escapeHtml(error.provider)}</strong>
                <span>${escapeHtml(error.at)}</span>
                <p>${escapeHtml(error.message)}</p>
            </li>
        `).join("")
        : "<li>Nenhum erro registrado ainda.</li>";

    return `<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TransLex Usage</title>
    <style>
        :root { color-scheme: dark; --bg: #08110e; --card: #111c17; --ink: #edf7f2; --muted: #9fb0a8; --line: #24342d; --accent: #45c4a5; --warn: #f4b75f; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Segoe UI, Arial, sans-serif; background: radial-gradient(circle at top left, rgba(69,196,165,.18), transparent 30%), var(--bg); color: var(--ink); }
        main { width: min(1120px, calc(100% - 28px)); margin: 0 auto; padding: 28px 0; }
        header { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
        h1, h2, p { margin-top: 0; }
        h1 { margin-bottom: 6px; }
        .muted { color: var(--muted); font-size: 13px; }
        .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 14px; }
        .card, .metric, .errors { background: rgba(17, 28, 23, .9); border: 1px solid var(--line); border-radius: 18px; padding: 16px; box-shadow: 0 18px 36px rgba(0,0,0,.24); }
        .metric strong { display: block; font-size: 28px; margin-bottom: 4px; }
        .card-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .pill { padding: 7px 10px; border-radius: 999px; font-size: 12px; font-weight: 800; }
        .ok { background: rgba(69,196,165,.14); color: var(--accent); }
        .warn { background: rgba(244,183,95,.14); color: var(--warn); }
        .model { color: var(--accent); font-weight: 800; }
        dl { display: grid; gap: 8px; margin: 14px 0; }
        dl div { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
        dt { color: var(--muted); }
        dd { margin: 0; font-weight: 900; }
        .errors { margin-top: 14px; }
        .errors ul { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
        .errors li { background: rgba(255,255,255,.03); border-radius: 12px; padding: 12px; }
        .errors span { display: block; color: var(--muted); font-size: 12px; margin-top: 4px; }
        .errors p { color: var(--muted); margin: 8px 0 0; word-break: break-word; }
        a { color: var(--accent); text-decoration: none; font-weight: 800; }
        @media (max-width: 860px) { .grid, .summary { grid-template-columns: 1fr; } header { align-items: start; flex-direction: column; } }
    </style>
</head>
<body>
    <main>
        <header>
            <div>
                <h1>TransLex Usage</h1>
                <p class="muted">Monitor local de tentativas, sucessos, falhas e chamadas por provedor.</p>
            </div>
            <a href="/usage.json">Ver JSON</a>
        </header>

        <section class="summary">
            <div class="metric"><strong>${stats.totalTranslationRequests}</strong><span class="muted">Requests totais</span></div>
            <div class="metric"><strong>${stats.completedTranslationRequests}</strong><span class="muted">Requests concluidos</span></div>
            <div class="metric"><strong>${stats.failedTranslationRequests}</strong><span class="muted">Requests com erro</span></div>
            <div class="metric"><strong>${stats.fallbackActivations.geminiToGroq + stats.fallbackActivations.geminiToGithubModels}</strong><span class="muted">Fallbacks acionados</span></div>
        </section>

        <section class="grid">
            ${providerCard("Gemini", "gemini", stats)}
            ${providerCard("Groq", "groq", stats)}
            ${providerCard("GitHub Models", "githubModels", stats)}
        </section>

        <section class="errors">
            <h2>Ultimos erros</h2>
            <ul>${lastErrors}</ul>
        </section>

        <p class="muted">Iniciado em: ${escapeHtml(stats.startedAt)} | Atualizado em: ${escapeHtml(stats.updatedAt)}</p>
    </main>
</body>
</html>`;
}

function sendHtml(res, statusCode, html) {
    res.writeHead(statusCode, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.end(html);
}

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

async function serveIconFile(res, pathname) {
    if (!pathname.startsWith("/icons/")) {
        return false;
    }

    const requestedName = path.basename(decodeURIComponent(pathname));
    const safePath = path.join(__dirname, "icons", requestedName);
    const extension = path.extname(requestedName).toLowerCase();
    const contentType = STATIC_ICON_TYPES[extension];

    if (!contentType) {
        return false;
    }

    const contents = await fs.readFile(safePath);
    res.writeHead(200, {
        "Content-Type": contentType
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

    markProviderApiCall("gemini");

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

async function callGroqApi(prompt, responseType = "json") {
    if (!GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY nao configurada.");
    }

    const body = {
        model: GROQ_MODEL,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.4
    };

    if (responseType === "json") {
        body.response_format = {
            type: "json_object"
        };
    }

    markProviderApiCall("groq");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq fallback retornou erro: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
        throw new Error("Groq fallback nao retornou texto.");
    }

    return text;
}

async function callGitHubModelsApi(prompt, responseType = "json") {
    if (!GITHUB_MODELS_TOKEN) {
        throw new Error("GITHUB_MODELS_TOKEN ou COPILOT_FALLBACK_TOKEN nao configurado.");
    }

    const body = {
        model: GITHUB_MODELS_MODEL,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.4
    };

    if (responseType === "json") {
        body.response_format = {
            type: "json_object"
        };
    }

    markProviderApiCall("githubModels");

    const response = await fetch(GITHUB_MODELS_ENDPOINT, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GITHUB_MODELS_TOKEN}`,
            "X-GitHub-Api-Version": "2026-03-10"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub Models fallback retornou erro: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
        throw new Error("GitHub Models fallback nao retornou texto.");
    }

    return text;
}

async function generateGeminiText(prompt, responseType = "json") {
    return callGeminiApi(
        [
            {
                text: prompt
            }
        ],
        responseType === "json" ? "application/json" : "text/plain"
    );
}

async function generateGroqText(prompt, responseType = "json") {
    return callGroqApi(prompt, responseType);
}

async function generateGitHubModelsText(prompt, responseType = "json") {
    return callGitHubModelsApi(prompt, responseType);
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

async function translateFullText(sourceText, sourceLanguage, targetLanguage, generateText) {
    const chunks = splitLongText(sourceText);
    const translatedChunks = [];

    for (const chunk of chunks) {
        const translatedChunk = await generateText(
            buildTranslationPrompt(chunk, sourceLanguage, targetLanguage),
            "text"
        );

        translatedChunks.push(translatedChunk.trim());
    }

    return translatedChunks.join("\n\n");
}

async function callProvider(providerName, modelName, generateText, sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    const translatedText = await translateFullText(sourceText, sourceLanguage, targetLanguage, generateText);
    const sourceExcerpt = createExcerpt(sourceText);
    const translatedExcerpt = createExcerpt(translatedText);
    const summaryText = await generateText(
        buildSummaryPrompt(sourceExcerpt, translatedExcerpt, sourceLanguage, targetLanguage, uiLanguage),
        "json"
    );
    const parsed = parseJsonText(summaryText);

    return {
        provider: `${providerName} (${modelName})`,
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

async function callGemini(sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    markProviderAttempt("gemini");

    return callProvider(
        "Gemini API",
        GEMINI_MODEL,
        generateGeminiText,
        sourceText,
        sourceLanguage,
        targetLanguage,
        uiLanguage
    ).then((result) => {
        markProviderSuccess("gemini");
        return result;
    }).catch((error) => {
        markProviderFailure("gemini", error);
        throw error;
    });
}

async function callGroqFallback(sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    markProviderAttempt("groq");

    return callProvider(
        "Groq fallback",
        GROQ_MODEL,
        generateGroqText,
        sourceText,
        sourceLanguage,
        targetLanguage,
        uiLanguage
    ).then((result) => {
        markProviderSuccess("groq");
        return result;
    }).catch((error) => {
        markProviderFailure("groq", error);
        throw error;
    });
}

async function callCopilotFallback(sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    markProviderAttempt("githubModels");

    return callProvider(
        "GitHub Models fallback",
        GITHUB_MODELS_MODEL,
        generateGitHubModelsText,
        sourceText,
        sourceLanguage,
        targetLanguage,
        uiLanguage
    ).then((result) => {
        markProviderSuccess("githubModels");
        return result;
    }).catch((error) => {
        markProviderFailure("githubModels", error);
        throw error;
    });
}

async function translateWithFallback(sourceText, sourceLanguage, targetLanguage, uiLanguage) {
    try {
        return await callGemini(sourceText, sourceLanguage, targetLanguage, uiLanguage);
    } catch (geminiError) {
        usageStats.fallbackActivations.geminiToGroq += 1;
        scheduleUsageSave();

        try {
            const groqResult = await callGroqFallback(sourceText, sourceLanguage, targetLanguage, uiLanguage);

            return {
                ...groqResult,
                fallbackFrom: "Gemini API",
                fallbackReason: geminiError.message
            };
        } catch (groqError) {
            usageStats.fallbackActivations.groqToGithubModels += 1;
            usageStats.fallbackActivations.geminiToGithubModels += 1;
            scheduleUsageSave();

            try {
                const fallbackResult = await callCopilotFallback(sourceText, sourceLanguage, targetLanguage, uiLanguage);

                return {
                    ...fallbackResult,
                    fallbackFrom: "Gemini API + Groq",
                    fallbackReason: `Gemini: ${geminiError.message} | Groq: ${groqError.message}`
                };
            } catch (fallbackError) {
                throw new Error(`Gemini falhou: ${geminiError.message} | Groq falhou: ${groqError.message} | GitHub Models falhou: ${fallbackError.message}`);
            }
        }
    }
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
            model: GEMINI_MODEL,
            groqConfigured: Boolean(GROQ_API_KEY),
            groqModel: GROQ_MODEL,
            fallbackProvider: "GitHub Models",
            fallbackConfigured: Boolean(GITHUB_MODELS_TOKEN),
            fallbackModel: GITHUB_MODELS_MODEL,
            usage: getPublicUsageStats()
        });
        return;
    }

    if (req.method === "GET" && url.pathname === "/usage") {
        sendHtml(res, 200, buildUsagePage());
        return;
    }

    if (req.method === "GET" && url.pathname === "/usage.json") {
        sendJson(res, 200, getPublicUsageStats());
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

    if (req.method === "GET" && url.pathname.startsWith("/icons/")) {
        try {
            const served = await serveIconFile(res, url.pathname);

            if (served) {
                return;
            }
        } catch (error) {
            sendJson(res, 404, {
                error: "Icone nao encontrado."
            });
            return;
        }
    }

    if (req.method === "POST" && url.pathname === "/translate") {
        let rawBody = "";

        req.on("data", (chunk) => {
            rawBody += chunk;
        });

        req.on("end", async () => {
            usageStats.totalTranslationRequests += 1;
            scheduleUsageSave();

            try {
                const body = JSON.parse(rawBody || "{}");
                const result = await translateWithFallback(
                    body.sourceText || "",
                    body.sourceLanguage || "auto",
                    body.targetLanguage || "en",
                    body.uiLanguage || body.targetLanguage || "pt"
                );

                usageStats.completedTranslationRequests += 1;
                scheduleUsageSave();
                sendJson(res, 200, result);
            } catch (error) {
                usageStats.failedTranslationRequests += 1;
                scheduleUsageSave();
                sendJson(res, 500, {
                    error: error.message
                });
            }
        });

        return;
    }

    sendJson(res, 404, { error: "Rota nao encontrada." });
});

loadUsageStats().finally(() => {
    server.listen(PORT, () => {
        console.log(`Servidor local da extensao rodando em http://localhost:${PORT}`);
    });
});
