const languageOptions = [
    { value: "auto", label: "Detectar automaticamente" },
    { value: "pt", label: "Portugues" },
    { value: "en", label: "Ingles" },
    { value: "es", label: "Espanhol" },
    { value: "fr", label: "Frances" },
    { value: "de", label: "Alemao" },
    { value: "it", label: "Italiano" },
    { value: "ja", label: "Japones" },
    { value: "ko", label: "Coreano" },
    { value: "zh", label: "Chines" },
    { value: "ru", label: "Russo" },
    { value: "ar", label: "Arabe" },
    { value: "hi", label: "Hindi" }
];

const languageNames = Object.fromEntries(languageOptions.map((item) => [item.value, item.label]));
const layoutLanguageOptions = languageOptions.filter((item) => item.value !== "auto");

const uiTexts = {
    pt: {
        appSubtitle: "Traducao contextual",
        interfaceLabel: "Interface",
        translatorTitle: "Tradutor",
        translatorCopy: "Traduza e aprenda com explicacoes no idioma da interface.",
        sourceLabel: "Origem",
        targetLabel: "Destino",
        originalLabel: "Texto original",
        sourcePlaceholder: "Digite uma palavra, frase ou pequeno dialogo...",
        translatedLabel: "Traducao final",
        translateButton: "Traduzir",
        conversationButton: "Simular conversa",
        clearButton: "Limpar texto",
        historyTitle: "Historico",
        historyCopy: "O ultimo texto e as ultimas traducoes ficam salvos no navegador.",
        clearHistoryButton: "Limpar historico",
        analysisTitle: "Analise",
        analysisCopy: "Resumo curto da traducao e do tom geral.",
        dictionaryTitle: "Dicionario e contexto",
        dictionaryCopy: "Nuances, significado principal e variacoes de uso.",
        conversationTitle: "Conversa simulada",
        conversationCopy: "Exemplo rapido de como a frase pode aparecer na pratica.",
        readyStatus: "Pronto para traduzir.",
        themeDark: "Tema noturno",
        themeLight: "Tema claro",
        translatedHeading: "Traducao principal",
        meaningHeading: "Sentido encontrado",
        contextHeading: "Melhor contexto de uso",
        synonymsHeading: "Sinonimos ou variacoes",
        meaningLabel: "Significado",
        backendUrlLabel: "URL do backend",
        saveBackendUrlButton: "Salvar URL",
        backendSavedStatus: "URL do backend salva.",
        translatingStatus: "Traduzindo...",
        translatedStatus: "Traducao concluida."
    },
    en: {
        appSubtitle: "Contextual translation",
        interfaceLabel: "Interface",
        translatorTitle: "Translator",
        translatorCopy: "Translate and learn with explanations in the interface language.",
        sourceLabel: "Source",
        targetLabel: "Target",
        originalLabel: "Original text",
        sourcePlaceholder: "Type a word, sentence or short dialogue...",
        translatedLabel: "Final translation",
        translateButton: "Translate",
        conversationButton: "Simulate conversation",
        clearButton: "Clear text",
        historyTitle: "History",
        historyCopy: "Your latest text and translations stay saved in the browser.",
        clearHistoryButton: "Clear history",
        analysisTitle: "Analysis",
        analysisCopy: "Short summary of the translation and overall tone.",
        dictionaryTitle: "Dictionary and context",
        dictionaryCopy: "Nuances, main meaning and usage variations.",
        conversationTitle: "Simulated conversation",
        conversationCopy: "Quick example of how the phrase can appear in practice.",
        readyStatus: "Ready to translate.",
        themeDark: "Dark mode",
        themeLight: "Light mode",
        translatedHeading: "Main translation",
        meaningHeading: "Meaning",
        contextHeading: "Best context",
        synonymsHeading: "Synonyms or variations",
        meaningLabel: "Meaning",
        backendUrlLabel: "Backend URL",
        saveBackendUrlButton: "Save URL",
        backendSavedStatus: "Backend URL saved.",
        translatingStatus: "Translating...",
        translatedStatus: "Translation completed."
    }
};

const dictionaryByPhrase = {
    "bom dia": {
        pt: "bom dia",
        en: "good morning",
        es: "buenos dias",
        fr: "bonjour",
        de: "guten morgen",
        it: "buongiorno",
        meaning: "Saudacao educada usada no comeco do dia.",
        context: "Muito comum em atendimento, reunioes, escola e conversas formais.",
        synonyms: "ola, saudacoes, bom comeco de dia"
    },
    "obrigado": {
        pt: "obrigado",
        en: "thank you",
        es: "gracias",
        fr: "merci",
        de: "danke",
        it: "grazie",
        meaning: "Expressao de gratidao.",
        context: "Funciona em contextos casuais e profissionais.",
        synonyms: "agradeco, valeu, muito agradecido"
    },
    "voce poderia me ajudar com este projeto?": {
        pt: "voce poderia me ajudar com este projeto?",
        en: "could you help me with this project?",
        es: "podrias ayudarme con este proyecto?",
        fr: "pourriez-vous m'aider avec ce projet ?",
        de: "konnten sie mir bei diesem projekt helfen?",
        it: "potresti aiutarmi con questo progetto?",
        meaning: "Pedido educado de ajuda.",
        context: "Boa escolha para trabalho, estudo ou conversas formais.",
        synonyms: "pode me ajudar?, preciso de ajuda com este projeto"
    },
    "preciso de ajuda": {
        pt: "preciso de ajuda",
        en: "i need help",
        es: "necesito ayuda",
        fr: "j'ai besoin d'aide",
        de: "ich brauche hilfe",
        it: "ho bisogno di aiuto",
        meaning: "Frase para solicitar suporte imediato.",
        context: "Pode soar urgente dependendo do tom e do ambiente.",
        synonyms: "pode me ajudar, preciso de suporte"
    }
};

const STORAGE_KEY = "translex_state_v2";
const HISTORY_LIMIT = 12;
const DEFAULT_TEXT = "";

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const sourceText = document.getElementById("sourceText");
const translatedText = document.getElementById("translatedText");
const translateButton = document.getElementById("translateButton");
const conversationButton = document.getElementById("conversationButton");
const clearButton = document.getElementById("clearButton");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const swapLanguages = document.getElementById("swapLanguages");
const analysisList = document.getElementById("analysisList");
const dictionaryPanel = document.getElementById("dictionaryPanel");
const conversationPanel = document.getElementById("conversationPanel");
const historyList = document.getElementById("historyList");
const detectionBadge = document.getElementById("detectionBadge");
const statusMessage = document.getElementById("statusMessage");
const shellBadge = document.getElementById("shellBadge");
const themeToggleButton = document.getElementById("themeToggleButton");
const uiLanguageSelect = document.getElementById("uiLanguageSelect");
const backendUrlInput = document.getElementById("backendUrlInput");
const saveBackendUrlButton = document.getElementById("saveBackendUrlButton");

let appState = {
    uiLanguage: "pt",
    sourceLanguage: "auto",
    targetLanguage: "pt",
    apiBaseUrl: "",
    sourceText: DEFAULT_TEXT,
    translatedText: "",
    lastResult: null,
    history: [],
    theme: "light"
};

function normalizeText(text) {
    return (text || "").trim().toLowerCase();
}

function getUiLanguage() {
    return uiTexts[appState.uiLanguage] ? appState.uiLanguage : "pt";
}

function getUiText(key) {
    const uiLanguage = getUiLanguage();
    return uiTexts[uiLanguage]?.[key] || uiTexts.pt[key] || key;
}

function normalizeLanguageCode(code) {
    if (!code) {
        return "pt";
    }

    const baseCode = String(code).toLowerCase().split("-")[0];
    const supportedCodes = languageOptions
        .map((item) => item.value)
        .filter((value) => value !== "auto");

    return supportedCodes.includes(baseCode) ? baseCode : "pt";
}

function getBrowserLanguage() {
    return normalizeLanguageCode(navigator.language || navigator.userLanguage || "pt-BR");
}

function sanitizeApiBaseUrl(url) {
    const trimmed = String(url || "").trim().replace(/\/+$/, "");
    return trimmed;
}

function resolveApiBaseUrl() {
    const savedUrl = sanitizeApiBaseUrl(appState.apiBaseUrl);

    if (savedUrl) {
        return savedUrl;
    }

    const protocol = window.location.protocol;

    if (protocol === "http:" || protocol === "https:") {
        return window.location.origin;
    }

    return "http://localhost:3000";
}

function hasExtensionStorage() {
    return typeof chrome !== "undefined" && Boolean(chrome.storage?.local);
}

function getLocalThemeLabel(theme) {
    return theme === "dark" ? getUiText("themeLight") : getUiText("themeDark");
}

function applyTheme(theme) {
    const activeTheme = theme === "dark" ? "dark" : "light";
    document.body.dataset.theme = activeTheme;
    themeToggleButton.textContent = getLocalThemeLabel(activeTheme);
}

function toggleTheme() {
    appState.theme = appState.theme === "dark" ? "light" : "dark";
    applyTheme(appState.theme);
    saveState();
}

function getShellMode() {
    const protocol = window.location.protocol;
    const isExtension = protocol === "chrome-extension:" || protocol === "moz-extension:";
    const width = window.innerWidth;

    if (width <= 640) {
        return isExtension ? "popup" : "mobile";
    }

    if (isExtension) {
        return "popup";
    }

    return "desktop";
}

function applyShellMode() {
    const shellMode = getShellMode();
    document.body.dataset.shell = shellMode;

    const labels = {
        popup: "Modo extensao",
        mobile: "Modo celular",
        desktop: "Modo pagina"
    };

    shellBadge.textContent = labels[shellMode];
}

function populateLanguageSelects() {
    sourceLanguage.innerHTML = languageOptions
        .map((item) => `<option value="${item.value}">${item.label}</option>`)
        .join("");

    targetLanguage.innerHTML = languageOptions
        .filter((item) => item.value !== "auto")
        .map((item) => `<option value="${item.value}">${item.label}</option>`)
        .join("");
}

function populateUiLanguageSelect() {
    uiLanguageSelect.innerHTML = layoutLanguageOptions
        .map((item) => `<option value="${item.value}">${item.label}</option>`)
        .join("");
}

function applyInterfaceLanguage() {
    const text = getUiText;

    document.documentElement.lang = getUiLanguage();
    document.querySelector(".eyebrow").textContent = text("appSubtitle");
    document.getElementById("uiLanguageLabel").textContent = text("interfaceLabel");
    document.querySelector(".translator-panel h2").textContent = text("translatorTitle");
    document.querySelector(".translator-panel .panel-copy").textContent = text("translatorCopy");
    document.querySelector('label[for="sourceLanguage"]');
    document.querySelectorAll(".language-row .field span")[0].textContent = text("sourceLabel");
    document.querySelectorAll(".language-row .field span")[1].textContent = text("targetLabel");
    document.querySelectorAll(".text-grid .field span")[0].textContent = text("originalLabel");
    document.querySelectorAll(".text-grid .field span")[1].textContent = text("translatedLabel");
    sourceText.placeholder = text("sourcePlaceholder");
    translateButton.textContent = text("translateButton");
    conversationButton.textContent = text("conversationButton");
    clearButton.textContent = text("clearButton");
    document.querySelector(".history-panel h2").textContent = text("historyTitle");
    document.querySelector(".history-panel .panel-copy").textContent = text("historyCopy");
    clearHistoryButton.textContent = text("clearHistoryButton");
    document.getElementById("backendUrlLabel").textContent = text("backendUrlLabel");
    saveBackendUrlButton.textContent = text("saveBackendUrlButton");
    document.querySelector(".insights-grid article:first-child h2").textContent = text("analysisTitle");
    document.querySelector(".insights-grid article:first-child .panel-copy").textContent = text("analysisCopy");
    document.querySelector(".insights-grid article:last-child h2").textContent = text("dictionaryTitle");
    document.querySelector(".insights-grid article:last-child .panel-copy").textContent = text("dictionaryCopy");
    document.querySelector(".conversation-panel h2").textContent = text("conversationTitle");
    document.querySelector(".conversation-panel .panel-copy").textContent = text("conversationCopy");

    if (!appState.lastResult && !sourceText.value.trim()) {
        statusMessage.textContent = text("readyStatus");
    }

    applyTheme(appState.theme || "light");
}

function detectLanguage(text) {
    const normalized = normalizeText(text);

    if (!normalized) {
        return "auto";
    }

    if (/[?]|voce|projeto|ajuda|bom dia|obrigado/.test(normalized)) {
        return "pt";
    }

    if (/\bthe\b|\bhello\b|\bgood morning\b|\bproject\b/.test(normalized)) {
        return "en";
    }

    if (/\bhola\b|\bbuenos dias\b|\bayuda\b|\bproyecto\b/.test(normalized)) {
        return "es";
    }

    if (/\bbonjour\b|\bmerci\b|\bprojet\b|\baider\b/.test(normalized)) {
        return "fr";
    }

    if (/\bguten morgen\b|\bdanke\b|\bhilfe\b/.test(normalized)) {
        return "de";
    }

    if (/\bbuongiorno\b|\bgrazie\b|\baiuto\b/.test(normalized)) {
        return "it";
    }

    return "pt";
}

function findDictionaryEntry(text) {
    const normalized = normalizeText(text);
    return Object.entries(dictionaryByPhrase).find(([key]) => normalized.includes(key))?.[1] || null;
}

function translateWithDictionary(text, from, to) {
    const entry = findDictionaryEntry(text);

    if (entry && entry[to]) {
        return entry[to];
    }

    const generic = {
        pt: "Traducao gerada com dicionario local, contexto e camada de IA.",
        en: "Translation generated with local dictionary, context and AI layer.",
        es: "Traduccion generada con diccionario local, contexto y capa de IA.",
        fr: "Traduction generee avec dictionnaire local, contexte et couche IA.",
        de: "Ubersetzung mit lokalem worterbuch, kontext und KI-ebene erstellt.",
        it: "Traduzione generata con dizionario locale, contesto e livello IA.",
        ja: "Contexto e dicionario local usados para gerar a traducao.",
        ko: "Contexto e dicionario local usados para gerar a traducao.",
        zh: "Contexto e dicionario local usados para gerar a traducao.",
        ru: "Contexto e dicionario local usados para gerar a traducao.",
        ar: "Contexto e dicionario local usados para gerar a traducao.",
        hi: "Contexto e dicionario local usados para gerar a traducao."
    };

    return generic[to] || text;
}

function explainByLanguage(code, textMap, fallback) {
    return textMap[code] || fallback;
}

function getAnalysisItems(result) {
    const explanationLanguage = getUiLanguage();
    const targetName = languageNames[result.target] || result.target;
    const toneLabel = result.tone || "neutro";
    const sourceName = languageNames[result.detected] || result.detected;

    return [
        explainByLanguage(
            explanationLanguage,
            {
                pt: `Idioma detectado: ${sourceName}.`,
                en: `Detected language: ${sourceName}.`,
                es: `Idioma detectado: ${sourceName}.`,
                fr: `Langue detectee : ${sourceName}.`,
                de: `Erkannte sprache: ${sourceName}.`,
                it: `Lingua rilevata: ${sourceName}.`
            },
            `Idioma detectado: ${sourceName}.`
        ),
        explainByLanguage(
            explanationLanguage,
            {
                pt: `Idioma de destino: ${targetName}.`,
                en: `Target language: ${targetName}.`,
                es: `Idioma de destino: ${targetName}.`,
                fr: `Langue cible : ${targetName}.`,
                de: `Zielsprache: ${targetName}.`,
                it: `Lingua di destinazione: ${targetName}.`
            },
            `Idioma de destino: ${targetName}.`
        ),
        explainByLanguage(
            explanationLanguage,
            {
                pt: `Tom percebido: ${toneLabel}.`,
                en: `Detected tone: ${toneLabel}.`,
                es: `Tono detectado: ${toneLabel}.`,
                fr: `Ton detecte : ${toneLabel}.`,
                de: `Erkannter ton: ${toneLabel}.`,
                it: `Tono rilevato: ${toneLabel}.`
            },
            `Tom percebido: ${toneLabel}.`
        ),
        explainByLanguage(
            explanationLanguage,
            {
                pt: "A traducao tenta soar natural no contexto, e nao apenas literal.",
                en: "The translation tries to sound natural in context, not just literal.",
                es: "La traduccion intenta sonar natural en contexto, no solo literal.",
                fr: "La traduction essaie de sembler naturelle dans le contexte, pas seulement litterale.",
                de: "Die ubersetzung soll im kontext naturlich klingen, nicht nur wortlich.",
                it: "La traduzione cerca di suonare naturale nel contesto, non solo letterale."
            },
            "A traducao tenta soar natural no contexto, e nao apenas literal."
        )
    ];
}

function buildAnalysis(result) {
    const items = getAnalysisItems(result);
    analysisList.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    detectionBadge.textContent = result.detected === "auto"
        ? "Sem deteccao"
        : `Detectado: ${languageNames[result.detected] || result.detected}`;
}

function buildDictionaryPanel(result) {
    dictionaryPanel.innerHTML = `
        <article class="dictionary-entry">
            <h3>${getUiText("translatedHeading")}</h3>
            <p><strong>${result.translation}</strong></p>
            <p>Origem: ${languageNames[result.detected] || result.detected} | Destino: ${languageNames[result.target] || result.target}</p>
        </article>
        <article class="dictionary-entry">
            <h3>${getUiText("meaningHeading")}</h3>
            <p>${result.meaning}</p>
        </article>
        <article class="dictionary-entry">
            <h3>${getUiText("contextHeading")}</h3>
            <p>${result.context}</p>
        </article>
        <article class="dictionary-entry">
            <h3>${getUiText("synonymsHeading")}</h3>
            <p>${result.synonyms}</p>
        </article>
    `;
}

function buildConversation(result) {
    conversationPanel.innerHTML = result.conversation.map((line) => `
        <article class="conversation-line">
            <div class="speaker">${line.speaker}</div>
            <p class="message">
                ${line.message}
                <span class="message-translation">${line.translationLabel || getUiText("meaningLabel")}: ${line.translation || line.message}</span>
            </p>
        </article>
    `).join("");
}

function buildLocalConversation(target, translation) {
    const responses = {
        en: {
            message: "Of course. Tell me what part of the project you want to improve first.",
            translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
        },
        es: {
            message: "Claro. Dime que parte del proyecto quieres mejorar primero.",
            translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
        },
        fr: {
            message: "Bien sur. Dites-moi quelle partie du projet vous voulez ameliorer d'abord.",
            translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
        },
        de: {
            message: "Klar. Sagen sie mir, welchen teil des projekts sie zuerst verbessern wollen.",
            translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
        },
        it: {
            message: "Certo. Dimmi quale parte del progetto vuoi migliorare per prima.",
            translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
        }
    };
    const personB = responses[target] || {
        message: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro.",
        translation: "Claro. Me diga qual parte do projeto voce quer melhorar primeiro."
    };

    return [
        {
            speaker: "Assistente",
            message: "Simulacao local ativada porque o backend do Gemini nao respondeu.",
            translationLabel: "Significado",
            translation: "O app usou o modo local para continuar funcionando."
        },
        {
            speaker: "Pessoa A",
            message: translation,
            translationLabel: "Significado",
            translation: sourceText.value.trim() || translation
        },
        {
            speaker: "Pessoa B",
            message: personB.message,
            translationLabel: "Significado",
            translation: personB.translation
        }
    ];
}

function buildLocalResult() {
    const text = sourceText.value;
    const detected = sourceLanguage.value === "auto" ? detectLanguage(text) : sourceLanguage.value;
    const target = targetLanguage.value;
    const entry = findDictionaryEntry(text);
    const translation = translateWithDictionary(text, detected, target);
    const fallbackEntry = {
        meaning: "A frase foi interpretada por contexto geral.",
        context: "Use a simulacao para ver como a ideia caberia em uma conversa real.",
        synonyms: "variacoes dependem do ambiente, grau de formalidade e intencao"
    };
    const activeEntry = entry || fallbackEntry;

    return {
        provider: "Modo local (fallback)",
        detected,
        target,
        explanationLanguage: getUiLanguage(),
        translation,
        meaning: activeEntry.meaning,
        context: activeEntry.context,
        synonyms: activeEntry.synonyms,
        tone: "neutro",
        conversation: buildLocalConversation(target, translation)
    };
}

async function fetchGeminiResult() {
    const text = sourceText.value;
    const detected = sourceLanguage.value === "auto" ? detectLanguage(text) : sourceLanguage.value;
    const target = targetLanguage.value;
    const uiLanguage = normalizeLanguageCode(uiLanguageSelect.value || appState.uiLanguage || getBrowserLanguage());
    const apiBaseUrl = resolveApiBaseUrl();

    const response = await fetch(`${apiBaseUrl}/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sourceText: text,
            sourceLanguage: detected,
            targetLanguage: target,
            uiLanguage
        })
    });

    if (!response.ok) {
        let message = "Falha ao consultar o backend.";

        try {
            const data = await response.json();
            message = data.error || message;
        } catch (error) {
            // Mantem a mensagem padrao.
        }

        throw new Error(message);
    }

    const result = await response.json();
    result.explanationLanguage = uiLanguage;
    return result;
}

function safeJsonParse(value, fallback) {
    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

async function getExtensionLocal(keys) {
    if (!hasExtensionStorage()) {
        return {};
    }

    return chrome.storage.local.get(keys);
}

async function setExtensionLocal(values) {
    if (!hasExtensionStorage()) {
        return;
    }

    await chrome.storage.local.set(values);
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        appState.uiLanguage = getBrowserLanguage();
        appState.targetLanguage = appState.uiLanguage;
        appState.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        return;
    }

    const parsed = safeJsonParse(saved, null);

    if (!parsed) {
        return;
    }

    appState = {
        ...appState,
        ...parsed
    };
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function syncDraftState() {
    appState.uiLanguage = normalizeLanguageCode(uiLanguageSelect.value || appState.uiLanguage || getBrowserLanguage());
    appState.sourceLanguage = sourceLanguage.value;
    appState.targetLanguage = targetLanguage.value;
    appState.sourceText = sourceText.value;
    appState.translatedText = translatedText.value;
    saveState();

    if (hasExtensionStorage()) {
        setExtensionLocal({
            preferredTargetLanguage: appState.targetLanguage
        });
    }
}

function restoreDraft() {
    uiLanguageSelect.value = normalizeLanguageCode(appState.uiLanguage || getBrowserLanguage());
    sourceLanguage.value = appState.sourceLanguage || "auto";
    targetLanguage.value = normalizeLanguageCode(appState.targetLanguage || getBrowserLanguage());
    sourceText.value = appState.sourceText || DEFAULT_TEXT;
    translatedText.value = appState.translatedText || "";
    backendUrlInput.value = sanitizeApiBaseUrl(appState.apiBaseUrl);
    applyTheme(appState.theme || "light");
}

function formatTimestamp(isoString) {
    try {
        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short"
        }).format(new Date(isoString));
    } catch (error) {
        return isoString;
    }
}

function addHistoryEntry(result) {
    const entry = {
        id: String(Date.now()),
        timestamp: new Date().toISOString(),
        sourceLanguage: sourceLanguage.value === "auto" ? result.detected : sourceLanguage.value,
        targetLanguage: targetLanguage.value,
        sourceText: sourceText.value.trim(),
        translatedText: result.translation,
        provider: result.provider
    };

    if (!entry.sourceText) {
        return;
    }

    const previous = appState.history[0];

    if (
        previous &&
        previous.sourceText === entry.sourceText &&
        previous.targetLanguage === entry.targetLanguage &&
        previous.translatedText === entry.translatedText
    ) {
        return;
    }

    appState.history = [entry, ...appState.history].slice(0, HISTORY_LIMIT);
    saveState();
    renderHistory();
}

function useHistoryEntry(id) {
    const entry = appState.history.find((item) => item.id === id);

    if (!entry) {
        return;
    }

    sourceLanguage.value = entry.sourceLanguage || "auto";
    targetLanguage.value = normalizeLanguageCode(entry.targetLanguage || getBrowserLanguage());
    sourceText.value = entry.sourceText || "";
    translatedText.value = entry.translatedText || "";
    syncDraftState();
    statusMessage.textContent = "Item do historico restaurado.";
}

function removeHistoryEntry(id) {
    appState.history = appState.history.filter((item) => item.id !== id);
    saveState();
    renderHistory();
    statusMessage.textContent = "Item removido do historico.";
}

function renderHistory() {
    if (!appState.history.length) {
        historyList.innerHTML = `<div class="empty-state">Nenhuma traducao salva ainda.</div>`;
        return;
    }

    historyList.innerHTML = appState.history.map((entry) => `
        <article class="history-item">
            <div class="history-head">
                <div>
                    <h3>${languageNames[entry.sourceLanguage] || entry.sourceLanguage} -> ${languageNames[entry.targetLanguage] || entry.targetLanguage}</h3>
                    <div class="history-meta">${formatTimestamp(entry.timestamp)} | ${entry.provider}</div>
                </div>
            </div>
            <p class="history-preview"><strong>Original:</strong> ${entry.sourceText}</p>
            <p class="history-preview"><strong>Traducao:</strong> ${entry.translatedText}</p>
            <div class="history-actions">
                <button class="history-button" type="button" data-action="use" data-id="${entry.id}">Usar de novo</button>
                <button class="history-remove" type="button" data-action="remove" data-id="${entry.id}">Excluir</button>
            </div>
        </article>
    `).join("");
}

function updateUiWithResult(result, statusText) {
    translatedText.value = result.translation;
    buildAnalysis(result);
    buildDictionaryPanel(result);
    buildConversation(result);
    statusMessage.textContent = statusText;
    appState.lastResult = result;
    appState.translatedText = result.translation;
    saveState();
    addHistoryEntry(result);
}

function saveBackendUrl() {
    appState.apiBaseUrl = sanitizeApiBaseUrl(backendUrlInput.value);
    backendUrlInput.value = appState.apiBaseUrl;
    saveState();
    statusMessage.textContent = `${getUiText("backendSavedStatus")} ${resolveApiBaseUrl()}`;
}

async function runTranslation() {
    translateButton.disabled = true;
    conversationButton.disabled = true;
    detectionBadge.textContent = "Processando...";
    statusMessage.textContent = getUiText("translatingStatus");
    syncDraftState();

    try {
        const result = await fetchGeminiResult();
        updateUiWithResult(result, getUiText("translatedStatus"));
    } catch (error) {
        const result = buildLocalResult();
        updateUiWithResult(result, `Usando modo local. Motivo: ${error.message}`);
    } finally {
        translateButton.disabled = false;
        conversationButton.disabled = false;
    }
}

function clearCurrentDraft() {
    sourceText.value = "";
    translatedText.value = "";
    analysisList.innerHTML = "";
    dictionaryPanel.innerHTML = "";
    conversationPanel.innerHTML = "";
    detectionBadge.textContent = "Aguardando texto";
    statusMessage.textContent = "Texto limpo. O historico foi mantido.";
    appState.sourceText = "";
    appState.translatedText = "";
    appState.lastResult = null;
    saveState();
}

function clearHistory() {
    appState.history = [];
    saveState();
    renderHistory();
    statusMessage.textContent = "Historico apagado.";
}

function hydrateInitialUi() {
    if (appState.lastResult) {
        buildAnalysis(appState.lastResult);
        buildDictionaryPanel(appState.lastResult);
        buildConversation(appState.lastResult);
        detectionBadge.textContent = appState.lastResult.detected === "auto"
            ? "Sem deteccao"
            : `Detectado: ${languageNames[appState.lastResult.detected] || appState.lastResult.detected}`;
        statusMessage.textContent = "Rascunho e ultimo resultado restaurados.";
    }
}

async function applyPendingSelectionFromExtension() {
    const data = await getExtensionLocal(["pendingSelectionText", "pendingSelectionTarget"]);
    const pendingText = (data.pendingSelectionText || "").trim();

    if (!pendingText) {
        return;
    }

    sourceText.value = pendingText;
    sourceLanguage.value = "auto";

    if (data.pendingSelectionTarget && data.pendingSelectionTarget !== "auto") {
        targetLanguage.value = normalizeLanguageCode(data.pendingSelectionTarget);
    } else {
        targetLanguage.value = normalizeLanguageCode(appState.uiLanguage || getBrowserLanguage());
    }

    syncDraftState();
    statusMessage.textContent = "Texto selecionado no navegador carregado automaticamente.";

    await setExtensionLocal({
        pendingSelectionText: "",
        pendingSelectionTarget: ""
    });

    await runTranslation();
}

function wireEvents() {
    translateButton.addEventListener("click", runTranslation);
    conversationButton.addEventListener("click", runTranslation);
    clearButton.addEventListener("click", clearCurrentDraft);
    clearHistoryButton.addEventListener("click", clearHistory);
    themeToggleButton.addEventListener("click", toggleTheme);
    saveBackendUrlButton.addEventListener("click", saveBackendUrl);
    uiLanguageSelect.addEventListener("change", () => {
        appState.uiLanguage = normalizeLanguageCode(uiLanguageSelect.value);
        if (!targetLanguage.value || targetLanguage.value === normalizeLanguageCode(appState.targetLanguage || getBrowserLanguage())) {
            targetLanguage.value = appState.uiLanguage;
        }
        applyInterfaceLanguage();
        syncDraftState();
    });

    swapLanguages.addEventListener("click", () => {
        if (sourceLanguage.value === "auto") {
            sourceLanguage.value = targetLanguage.value;
            targetLanguage.value = "pt";
        } else {
            const currentSource = sourceLanguage.value;
            sourceLanguage.value = targetLanguage.value;
            targetLanguage.value = currentSource;
        }

        syncDraftState();
        runTranslation();
    });

    sourceText.addEventListener("input", syncDraftState);
    sourceLanguage.addEventListener("change", syncDraftState);
    targetLanguage.addEventListener("change", syncDraftState);

    historyList.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const { action, id } = button.dataset;

        if (action === "use") {
            useHistoryEntry(id);
            return;
        }

        if (action === "remove") {
            removeHistoryEntry(id);
        }
    });

    window.addEventListener("resize", applyShellMode);
}

populateLanguageSelects();
populateUiLanguageSelect();
loadState();
restoreDraft();
applyInterfaceLanguage();
applyShellMode();
renderHistory();
hydrateInitialUi();
wireEvents();

if (!appState.lastResult && !sourceText.value.trim()) {
    sourceText.value = DEFAULT_TEXT;
    syncDraftState();
}

applyPendingSelectionFromExtension();
