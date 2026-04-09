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
const PUBLIC_APP_URL = "https://translex-46nz.onrender.com";
const interfaceLanguageLabels = {
    pt: "Portugues",
    en: "English",
    es: "Espanol",
    fr: "Francais",
    de: "Deutsch",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    zh: "中文",
    ru: "Русский",
    ar: "العربية",
    hi: "हिन्दी"
};

const uiTexts = {
    pt: {
        appSubtitle: "Traducao contextual",
        topbarCopy: "Traduza e aprenda com explicacoes naturais no idioma da interface.",
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
        translatingStatus: "Traduzindo...",
        translatedStatus: "Traducao concluida.",
        shellPopup: "Modo extensao",
        shellMobile: "Modo celular",
        shellDesktop: "Modo pagina",
        waitingDetection: "Aguardando texto",
        noDetection: "Sem deteccao",
        detectedPrefix: "Detectado",
        emptyHistory: "Nenhuma traducao salva ainda.",
        historyOriginal: "Original",
        historyTranslation: "Traducao",
        historyUseAgain: "Usar de novo",
        historyDelete: "Excluir",
        historyItemRestored: "Item do historico restaurado.",
        historyItemRemoved: "Item removido do historico.",
        historyCleared: "Historico apagado.",
        draftCleared: "Texto limpo. O historico foi mantido.",
        lastResultRestored: "Rascunho e ultimo resultado restaurados.",
        pendingSelectionLoaded: "Texto selecionado no navegador carregado automaticamente.",
        localModePrefix: "Usando modo local. Motivo:",
        sourceInfoLabel: "Origem",
        targetInfoLabel: "Destino",
        processingStatusBadge: "Processando..."
    },
    en: {
        appSubtitle: "Contextual translation",
        topbarCopy: "Translate and learn with natural explanations in the interface language.",
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
        translatingStatus: "Translating...",
        translatedStatus: "Translation completed.",
        shellPopup: "Extension mode",
        shellMobile: "Mobile mode",
        shellDesktop: "Page mode",
        waitingDetection: "Waiting for text",
        noDetection: "No detection",
        detectedPrefix: "Detected",
        emptyHistory: "No saved translations yet.",
        historyOriginal: "Original",
        historyTranslation: "Translation",
        historyUseAgain: "Use again",
        historyDelete: "Delete",
        historyItemRestored: "History item restored.",
        historyItemRemoved: "History item removed.",
        historyCleared: "History cleared.",
        draftCleared: "Text cleared. History was kept.",
        lastResultRestored: "Draft and latest result restored.",
        pendingSelectionLoaded: "Selected browser text loaded automatically.",
        localModePrefix: "Using local mode. Reason:",
        sourceInfoLabel: "Source",
        targetInfoLabel: "Target",
        processingStatusBadge: "Processing..."
    }
};

uiTexts.es = {
    appSubtitle: "Traduccion contextual",
    topbarCopy: "Traduce y aprende con explicaciones naturales en el idioma de la interfaz.",
    interfaceLabel: "Interfaz",
    translatorTitle: "Traductor",
    translatorCopy: "Traduce y aprende con explicaciones en el idioma de la interfaz.",
    sourceLabel: "Origen",
    targetLabel: "Destino",
    originalLabel: "Texto original",
    sourcePlaceholder: "Escribe una palabra, frase o dialogo corto...",
    translatedLabel: "Traduccion final",
    translateButton: "Traducir",
    conversationButton: "Simular conversacion",
    clearButton: "Limpiar texto",
    historyTitle: "Historial",
    historyCopy: "Tus ultimos textos y traducciones quedan guardados en el navegador.",
    clearHistoryButton: "Borrar historial",
    analysisTitle: "Analisis",
    analysisCopy: "Resumen corto de la traduccion y del tono general.",
    dictionaryTitle: "Diccionario y contexto",
    dictionaryCopy: "Matices, significado principal y variaciones de uso.",
    conversationTitle: "Conversacion simulada",
    conversationCopy: "Ejemplo rapido de como la frase puede aparecer en la practica.",
    readyStatus: "Listo para traducir.",
    themeDark: "Tema oscuro",
    themeLight: "Tema claro",
    translatedHeading: "Traduccion principal",
    meaningHeading: "Significado",
    contextHeading: "Mejor contexto",
    synonymsHeading: "Sinonimos o variaciones",
    meaningLabel: "Significado",
    translatingStatus: "Traduciendo...",
    translatedStatus: "Traduccion completada.",
    shellPopup: "Modo extension",
    shellMobile: "Modo movil",
    shellDesktop: "Modo pagina",
    waitingDetection: "Esperando texto",
    noDetection: "Sin deteccion",
    detectedPrefix: "Detectado",
    emptyHistory: "Todavia no hay traducciones guardadas.",
    historyOriginal: "Original",
    historyTranslation: "Traduccion",
    historyUseAgain: "Usar de nuevo",
    historyDelete: "Eliminar",
    historyItemRestored: "Elemento del historial restaurado.",
    historyItemRemoved: "Elemento eliminado del historial.",
    historyCleared: "Historial borrado.",
    draftCleared: "Texto borrado. El historial se mantuvo.",
    lastResultRestored: "Borrador y ultimo resultado restaurados.",
    pendingSelectionLoaded: "El texto seleccionado del navegador se cargo automaticamente.",
    localModePrefix: "Usando modo local. Motivo:",
    sourceInfoLabel: "Origen",
    targetInfoLabel: "Destino",
    processingStatusBadge: "Procesando..."
};

uiTexts.fr = {
    appSubtitle: "Traduction contextuelle",
    topbarCopy: "Traduisez et apprenez avec des explications naturelles dans la langue de l'interface.",
    interfaceLabel: "Interface",
    translatorTitle: "Traducteur",
    translatorCopy: "Traduisez et apprenez avec des explications dans la langue de l'interface.",
    sourceLabel: "Source",
    targetLabel: "Cible",
    originalLabel: "Texte original",
    sourcePlaceholder: "Entrez un mot, une phrase ou un court dialogue...",
    translatedLabel: "Traduction finale",
    translateButton: "Traduire",
    conversationButton: "Simuler une conversation",
    clearButton: "Effacer le texte",
    historyTitle: "Historique",
    historyCopy: "Vos derniers textes et traductions restent enregistres dans le navigateur.",
    clearHistoryButton: "Effacer l'historique",
    analysisTitle: "Analyse",
    analysisCopy: "Resume court de la traduction et du ton general.",
    dictionaryTitle: "Dictionnaire et contexte",
    dictionaryCopy: "Nuances, sens principal et variations d'usage.",
    conversationTitle: "Conversation simulee",
    conversationCopy: "Exemple rapide de la facon dont la phrase peut apparaitre en pratique.",
    readyStatus: "Pret a traduire.",
    themeDark: "Theme sombre",
    themeLight: "Theme clair",
    translatedHeading: "Traduction principale",
    meaningHeading: "Sens",
    contextHeading: "Meilleur contexte",
    synonymsHeading: "Synonymes ou variantes",
    meaningLabel: "Sens",
    translatingStatus: "Traduction en cours...",
    translatedStatus: "Traduction terminee.",
    shellPopup: "Mode extension",
    shellMobile: "Mode mobile",
    shellDesktop: "Mode page",
    waitingDetection: "En attente de texte",
    noDetection: "Aucune detection",
    detectedPrefix: "Detecte",
    emptyHistory: "Aucune traduction enregistree pour le moment.",
    historyOriginal: "Original",
    historyTranslation: "Traduction",
    historyUseAgain: "Reutiliser",
    historyDelete: "Supprimer",
    historyItemRestored: "Element de l'historique restaure.",
    historyItemRemoved: "Element supprime de l'historique.",
    historyCleared: "Historique efface.",
    draftCleared: "Texte efface. L'historique a ete conserve.",
    lastResultRestored: "Brouillon et dernier resultat restaures.",
    pendingSelectionLoaded: "Le texte selectionne dans le navigateur a ete charge automatiquement.",
    localModePrefix: "Mode local utilise. Raison :",
    sourceInfoLabel: "Source",
    targetInfoLabel: "Cible",
    processingStatusBadge: "Traitement..."
};

uiTexts.de = {
    appSubtitle: "Kontextbezogene Ubersetzung",
    topbarCopy: "Ubersetze und lerne mit naturlichen Erklarungen in der Sprache der Oberflache.",
    interfaceLabel: "Oberflache",
    translatorTitle: "Ubersetzer",
    translatorCopy: "Ubersetze und lerne mit Erklarungen in der Sprache der Oberflache.",
    sourceLabel: "Quelle",
    targetLabel: "Ziel",
    originalLabel: "Originaltext",
    sourcePlaceholder: "Gib ein Wort, einen Satz oder einen kurzen Dialog ein...",
    translatedLabel: "Endgultige Ubersetzung",
    translateButton: "Ubersetzen",
    conversationButton: "Gesprache simulieren",
    clearButton: "Text loschen",
    historyTitle: "Verlauf",
    historyCopy: "Deine letzten Texte und Ubersetzungen bleiben im Browser gespeichert.",
    clearHistoryButton: "Verlauf loschen",
    analysisTitle: "Analyse",
    analysisCopy: "Kurze Zusammenfassung der Ubersetzung und des allgemeinen Tons.",
    dictionaryTitle: "Worterbuch und Kontext",
    dictionaryCopy: "Nuancen, Hauptbedeutung und Nutzungsvarianten.",
    conversationTitle: "Simuliertes Gesprach",
    conversationCopy: "Kurzes Beispiel, wie der Satz in der Praxis erscheinen kann.",
    readyStatus: "Bereit zum Ubersetzen.",
    themeDark: "Dunkles Thema",
    themeLight: "Helles Thema",
    translatedHeading: "Hauptubersetzung",
    meaningHeading: "Bedeutung",
    contextHeading: "Bester Kontext",
    synonymsHeading: "Synonyme oder Varianten",
    meaningLabel: "Bedeutung",
    translatingStatus: "Wird ubersetzt...",
    translatedStatus: "Ubersetzung abgeschlossen.",
    shellPopup: "Erweiterungsmodus",
    shellMobile: "Mobilmodus",
    shellDesktop: "Seitenmodus",
    waitingDetection: "Warte auf Text",
    noDetection: "Keine Erkennung",
    detectedPrefix: "Erkannt",
    emptyHistory: "Noch keine gespeicherten Ubersetzungen.",
    historyOriginal: "Original",
    historyTranslation: "Ubersetzung",
    historyUseAgain: "Erneut verwenden",
    historyDelete: "Loschen",
    historyItemRestored: "Verlaufseintrag wiederhergestellt.",
    historyItemRemoved: "Verlaufseintrag entfernt.",
    historyCleared: "Verlauf geloscht.",
    draftCleared: "Text geloscht. Der Verlauf blieb erhalten.",
    lastResultRestored: "Entwurf und letztes Ergebnis wiederhergestellt.",
    pendingSelectionLoaded: "Markierter Browsertext wurde automatisch geladen.",
    localModePrefix: "Lokaler Modus verwendet. Grund:",
    sourceInfoLabel: "Quelle",
    targetInfoLabel: "Ziel",
    processingStatusBadge: "Verarbeitung..."
};

uiTexts.it = {
    appSubtitle: "Traduzione contestuale",
    topbarCopy: "Traduci e impara con spiegazioni naturali nella lingua dell'interfaccia.",
    interfaceLabel: "Interfaccia",
    translatorTitle: "Traduttore",
    translatorCopy: "Traduci e impara con spiegazioni nella lingua dell'interfaccia.",
    sourceLabel: "Origine",
    targetLabel: "Destinazione",
    originalLabel: "Testo originale",
    sourcePlaceholder: "Scrivi una parola, una frase o un breve dialogo...",
    translatedLabel: "Traduzione finale",
    translateButton: "Traduci",
    conversationButton: "Simula conversazione",
    clearButton: "Cancella testo",
    historyTitle: "Cronologia",
    historyCopy: "Gli ultimi testi e le ultime traduzioni restano salvati nel browser.",
    clearHistoryButton: "Cancella cronologia",
    analysisTitle: "Analisi",
    analysisCopy: "Breve riepilogo della traduzione e del tono generale.",
    dictionaryTitle: "Dizionario e contesto",
    dictionaryCopy: "Sfumature, significato principale e varianti d'uso.",
    conversationTitle: "Conversazione simulata",
    conversationCopy: "Esempio rapido di come la frase puo apparire nella pratica.",
    readyStatus: "Pronto per tradurre.",
    themeDark: "Tema scuro",
    themeLight: "Tema chiaro",
    translatedHeading: "Traduzione principale",
    meaningHeading: "Significato",
    contextHeading: "Contesto migliore",
    synonymsHeading: "Sinonimi o varianti",
    meaningLabel: "Significato",
    translatingStatus: "Traduzione in corso...",
    translatedStatus: "Traduzione completata.",
    shellPopup: "Modalita estensione",
    shellMobile: "Modalita mobile",
    shellDesktop: "Modalita pagina",
    waitingDetection: "In attesa di testo",
    noDetection: "Nessun rilevamento",
    detectedPrefix: "Rilevato",
    emptyHistory: "Nessuna traduzione salvata.",
    historyOriginal: "Originale",
    historyTranslation: "Traduzione",
    historyUseAgain: "Usa di nuovo",
    historyDelete: "Elimina",
    historyItemRestored: "Elemento della cronologia ripristinato.",
    historyItemRemoved: "Elemento rimosso dalla cronologia.",
    historyCleared: "Cronologia cancellata.",
    draftCleared: "Testo cancellato. La cronologia e stata mantenuta.",
    lastResultRestored: "Bozza e ultimo risultato ripristinati.",
    pendingSelectionLoaded: "Il testo selezionato nel browser e stato caricato automaticamente.",
    localModePrefix: "Modalita locale attiva. Motivo:",
    sourceInfoLabel: "Origine",
    targetInfoLabel: "Destinazione",
    processingStatusBadge: "Elaborazione..."
};

uiTexts.ja = {
    appSubtitle: "文脈翻訳",
    topbarCopy: "アプリの言語で自然な説明を見ながら翻訳できます。",
    interfaceLabel: "表示言語",
    translatorTitle: "翻訳",
    translatorCopy: "アプリの言語で説明を見ながら学べます。",
    sourceLabel: "原文",
    targetLabel: "翻訳先",
    originalLabel: "原文",
    sourcePlaceholder: "単語、文、短い会話を入力...",
    translatedLabel: "翻訳結果",
    translateButton: "翻訳",
    conversationButton: "会話を作成",
    clearButton: "消去",
    historyTitle: "履歴",
    historyCopy: "最近の入力と翻訳はブラウザに保存されます。",
    clearHistoryButton: "履歴を消去",
    analysisTitle: "分析",
    analysisCopy: "翻訳とトーンの短い要約。",
    dictionaryTitle: "辞書と文脈",
    dictionaryCopy: "意味、ニュアンス、使い方。",
    conversationTitle: "会話例",
    conversationCopy: "実際の使い方の短い例。",
    readyStatus: "翻訳の準備ができました。",
    themeDark: "ダーク",
    themeLight: "ライト",
    translatedHeading: "主な翻訳",
    meaningHeading: "意味",
    contextHeading: "使う場面",
    synonymsHeading: "類義表現",
    meaningLabel: "意味",
    translatingStatus: "翻訳中...",
    translatedStatus: "翻訳が完了しました。",
    shellPopup: "拡張機能",
    shellMobile: "モバイル",
    shellDesktop: "ページ",
    waitingDetection: "テキスト待機中",
    noDetection: "未検出",
    detectedPrefix: "検出",
    emptyHistory: "保存された翻訳はまだありません。",
    historyOriginal: "原文",
    historyTranslation: "翻訳",
    historyUseAgain: "もう一度使う",
    historyDelete: "削除",
    historyItemRestored: "履歴を復元しました。",
    historyItemRemoved: "履歴を削除しました。",
    historyCleared: "履歴を消去しました。",
    draftCleared: "テキストを消去しました。履歴は保持されました。",
    lastResultRestored: "下書きと最新結果を復元しました。",
    pendingSelectionLoaded: "ブラウザで選択したテキストを自動で読み込みました。",
    localModePrefix: "ローカルモードを使用中。理由:",
    sourceInfoLabel: "原文",
    targetInfoLabel: "翻訳先",
    processingStatusBadge: "処理中..."
};

uiTexts.ko = {
    appSubtitle: "문맥 번역",
    topbarCopy: "인터페이스 언어로 자연스러운 설명을 보며 번역할 수 있습니다.",
    interfaceLabel: "인터페이스",
    translatorTitle: "번역기",
    translatorCopy: "인터페이스 언어 설명과 함께 번역하고 배웁니다.",
    sourceLabel: "원문",
    targetLabel: "대상",
    originalLabel: "원문",
    sourcePlaceholder: "단어, 문장 또는 짧은 대화를 입력하세요...",
    translatedLabel: "최종 번역",
    translateButton: "번역",
    conversationButton: "대화 시뮬레이션",
    clearButton: "텍스트 지우기",
    historyTitle: "기록",
    historyCopy: "최근 텍스트와 번역은 브라우저에 저장됩니다.",
    clearHistoryButton: "기록 지우기",
    analysisTitle: "분석",
    analysisCopy: "번역과 전체 톤의 짧은 요약입니다.",
    dictionaryTitle: "사전과 문맥",
    dictionaryCopy: "뉘앙스, 주요 의미, 사용 변형.",
    conversationTitle: "대화 예시",
    conversationCopy: "실제로 어떻게 쓰이는지 짧은 예시입니다.",
    readyStatus: "번역할 준비가 되었습니다.",
    themeDark: "다크",
    themeLight: "라이트",
    translatedHeading: "주요 번역",
    meaningHeading: "의미",
    contextHeading: "적절한 문맥",
    synonymsHeading: "유의어 또는 변형",
    meaningLabel: "의미",
    translatingStatus: "번역 중...",
    translatedStatus: "번역이 완료되었습니다.",
    shellPopup: "확장 모드",
    shellMobile: "모바일 모드",
    shellDesktop: "페이지 모드",
    waitingDetection: "텍스트 대기 중",
    noDetection: "감지 없음",
    detectedPrefix: "감지됨",
    emptyHistory: "저장된 번역이 아직 없습니다.",
    historyOriginal: "원문",
    historyTranslation: "번역",
    historyUseAgain: "다시 사용",
    historyDelete: "삭제",
    historyItemRestored: "기록 항목을 복원했습니다.",
    historyItemRemoved: "기록 항목을 삭제했습니다.",
    historyCleared: "기록을 지웠습니다.",
    draftCleared: "텍스트를 지웠습니다. 기록은 유지되었습니다.",
    lastResultRestored: "임시 저장과 최근 결과를 복원했습니다.",
    pendingSelectionLoaded: "브라우저에서 선택한 텍스트를 자동으로 불러왔습니다.",
    localModePrefix: "로컬 모드 사용 중. 이유:",
    sourceInfoLabel: "원문",
    targetInfoLabel: "대상",
    processingStatusBadge: "처리 중..."
};

uiTexts.zh = {
    appSubtitle: "语境翻译",
    topbarCopy: "用界面语言查看自然解释并进行翻译。",
    interfaceLabel: "界面语言",
    translatorTitle: "翻译",
    translatorCopy: "在界面语言的说明中边翻译边学习。",
    sourceLabel: "原文",
    targetLabel: "目标",
    originalLabel: "原文",
    sourcePlaceholder: "输入单词、句子或简短对话...",
    translatedLabel: "最终翻译",
    translateButton: "翻译",
    conversationButton: "模拟对话",
    clearButton: "清空文本",
    historyTitle: "历史记录",
    historyCopy: "最近的文本和翻译会保存在浏览器中。",
    clearHistoryButton: "清空历史",
    analysisTitle: "分析",
    analysisCopy: "对翻译和整体语气的简短总结。",
    dictionaryTitle: "词典与语境",
    dictionaryCopy: "细微差别、主要含义和使用变化。",
    conversationTitle: "模拟对话",
    conversationCopy: "短示例，展示这句话在实际中的用法。",
    readyStatus: "可以开始翻译了。",
    themeDark: "深色",
    themeLight: "浅色",
    translatedHeading: "主要翻译",
    meaningHeading: "含义",
    contextHeading: "最佳语境",
    synonymsHeading: "近义表达",
    meaningLabel: "含义",
    translatingStatus: "翻译中...",
    translatedStatus: "翻译完成。",
    shellPopup: "扩展模式",
    shellMobile: "移动模式",
    shellDesktop: "页面模式",
    waitingDetection: "等待文本",
    noDetection: "未检测",
    detectedPrefix: "已检测",
    emptyHistory: "还没有保存的翻译。",
    historyOriginal: "原文",
    historyTranslation: "翻译",
    historyUseAgain: "再次使用",
    historyDelete: "删除",
    historyItemRestored: "已恢复历史记录。",
    historyItemRemoved: "已删除历史记录。",
    historyCleared: "历史记录已清空。",
    draftCleared: "文本已清空，历史记录已保留。",
    lastResultRestored: "已恢复草稿和最新结果。",
    pendingSelectionLoaded: "已自动加载浏览器中选中的文本。",
    localModePrefix: "正在使用本地模式。原因:",
    sourceInfoLabel: "原文",
    targetInfoLabel: "目标",
    processingStatusBadge: "处理中..."
};

uiTexts.ru = {
    appSubtitle: "Контекстный перевод",
    topbarCopy: "Переводите и учитесь с естественными объяснениями на языке интерфейса.",
    interfaceLabel: "Интерфейс",
    translatorTitle: "Переводчик",
    translatorCopy: "Переводите и учитесь с пояснениями на языке интерфейса.",
    sourceLabel: "Источник",
    targetLabel: "Назначение",
    originalLabel: "Исходный текст",
    sourcePlaceholder: "Введите слово, фразу или короткий диалог...",
    translatedLabel: "Итоговый перевод",
    translateButton: "Перевести",
    conversationButton: "Смоделировать диалог",
    clearButton: "Очистить текст",
    historyTitle: "История",
    historyCopy: "Последние тексты и переводы сохраняются в браузере.",
    clearHistoryButton: "Очистить историю",
    analysisTitle: "Анализ",
    analysisCopy: "Краткое резюме перевода и общего тона.",
    dictionaryTitle: "Словарь и контекст",
    dictionaryCopy: "Нюансы, основное значение и варианты использования.",
    conversationTitle: "Смоделированный диалог",
    conversationCopy: "Короткий пример того, как фраза может использоваться на практике.",
    readyStatus: "Готово к переводу.",
    themeDark: "Темная тема",
    themeLight: "Светлая тема",
    translatedHeading: "Основной перевод",
    meaningHeading: "Значение",
    contextHeading: "Лучший контекст",
    synonymsHeading: "Синонимы или варианты",
    meaningLabel: "Значение",
    translatingStatus: "Перевод...",
    translatedStatus: "Перевод завершен.",
    shellPopup: "Режим расширения",
    shellMobile: "Мобильный режим",
    shellDesktop: "Режим страницы",
    waitingDetection: "Ожидание текста",
    noDetection: "Нет определения",
    detectedPrefix: "Определено",
    emptyHistory: "Сохраненных переводов пока нет.",
    historyOriginal: "Оригинал",
    historyTranslation: "Перевод",
    historyUseAgain: "Использовать снова",
    historyDelete: "Удалить",
    historyItemRestored: "Элемент истории восстановлен.",
    historyItemRemoved: "Элемент истории удален.",
    historyCleared: "История очищена.",
    draftCleared: "Текст очищен. История сохранена.",
    lastResultRestored: "Черновик и последний результат восстановлены.",
    pendingSelectionLoaded: "Выделенный в браузере текст загружен автоматически.",
    localModePrefix: "Используется локальный режим. Причина:",
    sourceInfoLabel: "Источник",
    targetInfoLabel: "Назначение",
    processingStatusBadge: "Обработка..."
};

uiTexts.ar = {
    appSubtitle: "ترجمة سياقية",
    topbarCopy: "ترجم وتعلم مع شروحات طبيعية بلغة الواجهة.",
    interfaceLabel: "الواجهة",
    translatorTitle: "المترجم",
    translatorCopy: "ترجم وتعلم مع شروحات بلغة الواجهة.",
    sourceLabel: "المصدر",
    targetLabel: "الهدف",
    originalLabel: "النص الاصلي",
    sourcePlaceholder: "اكتب كلمة او جملة او حوارا قصيرا...",
    translatedLabel: "الترجمة النهائية",
    translateButton: "ترجمة",
    conversationButton: "محاكاة محادثة",
    clearButton: "مسح النص",
    historyTitle: "السجل",
    historyCopy: "يتم حفظ اخر النصوص والترجمات في المتصفح.",
    clearHistoryButton: "مسح السجل",
    analysisTitle: "التحليل",
    analysisCopy: "ملخص قصير للترجمة والنبرة العامة.",
    dictionaryTitle: "القاموس والسياق",
    dictionaryCopy: "الفروق والمعنى الرئيسي وطرق الاستخدام.",
    conversationTitle: "محادثة تجريبية",
    conversationCopy: "مثال سريع لكيفية ظهور العبارة في الاستخدام الفعلي.",
    readyStatus: "جاهز للترجمة.",
    themeDark: "داكن",
    themeLight: "فاتح",
    translatedHeading: "الترجمة الرئيسية",
    meaningHeading: "المعنى",
    contextHeading: "افضل سياق",
    synonymsHeading: "مرادفات او تنويعات",
    meaningLabel: "المعنى",
    translatingStatus: "جار الترجمة...",
    translatedStatus: "اكتملت الترجمة.",
    shellPopup: "وضع الاضافة",
    shellMobile: "وضع الجوال",
    shellDesktop: "وضع الصفحة",
    waitingDetection: "بانتظار النص",
    noDetection: "بدون اكتشاف",
    detectedPrefix: "تم الاكتشاف",
    emptyHistory: "لا توجد ترجمات محفوظة بعد.",
    historyOriginal: "الاصل",
    historyTranslation: "الترجمة",
    historyUseAgain: "استخدام مرة اخرى",
    historyDelete: "حذف",
    historyItemRestored: "تمت استعادة عنصر السجل.",
    historyItemRemoved: "تم حذف عنصر السجل.",
    historyCleared: "تم مسح السجل.",
    draftCleared: "تم مسح النص مع الاحتفاظ بالسجل.",
    lastResultRestored: "تمت استعادة المسودة واخر نتيجة.",
    pendingSelectionLoaded: "تم تحميل النص المحدد من المتصفح تلقائيا.",
    localModePrefix: "يتم استخدام الوضع المحلي. السبب:",
    sourceInfoLabel: "المصدر",
    targetInfoLabel: "الهدف",
    processingStatusBadge: "جار المعالجة..."
};

uiTexts.hi = {
    appSubtitle: "प्रासंगिक अनुवाद",
    topbarCopy: "इंटरफेस की भाषा में स्वाभाविक व्याख्याओं के साथ अनुवाद करें और सीखें।",
    interfaceLabel: "इंटरफेस",
    translatorTitle: "अनुवादक",
    translatorCopy: "इंटरफेस की भाषा में व्याख्याओं के साथ अनुवाद करें और सीखें।",
    sourceLabel: "स्रोत",
    targetLabel: "लक्ष्य",
    originalLabel: "मूल पाठ",
    sourcePlaceholder: "कोई शब्द, वाक्य या छोटा संवाद लिखें...",
    translatedLabel: "अंतिम अनुवाद",
    translateButton: "अनुवाद करें",
    conversationButton: "बातचीत बनाएं",
    clearButton: "पाठ साफ करें",
    historyTitle: "इतिहास",
    historyCopy: "आपके हाल के पाठ और अनुवाद ब्राउजर में सहेजे रहते हैं।",
    clearHistoryButton: "इतिहास साफ करें",
    analysisTitle: "विश्लेषण",
    analysisCopy: "अनुवाद और समग्र टोन का छोटा सारांश।",
    dictionaryTitle: "शब्दकोश और संदर्भ",
    dictionaryCopy: "बारीकियां, मुख्य अर्थ और उपयोग के रूप।",
    conversationTitle: "काल्पनिक बातचीत",
    conversationCopy: "यह वाक्य व्यवहार में कैसे दिख सकता है, उसका छोटा उदाहरण।",
    readyStatus: "अनुवाद के लिए तैयार।",
    themeDark: "डार्क",
    themeLight: "लाइट",
    translatedHeading: "मुख्य अनुवाद",
    meaningHeading: "अर्थ",
    contextHeading: "सबसे अच्छा संदर्भ",
    synonymsHeading: "समानार्थी या रूपांतर",
    meaningLabel: "अर्थ",
    translatingStatus: "अनुवाद हो रहा है...",
    translatedStatus: "अनुवाद पूरा हुआ।",
    shellPopup: "एक्सटेंशन मोड",
    shellMobile: "मोबाइल मोड",
    shellDesktop: "पेज मोड",
    waitingDetection: "पाठ की प्रतीक्षा",
    noDetection: "कोई पहचान नहीं",
    detectedPrefix: "पहचाना गया",
    emptyHistory: "अभी तक कोई सहेजा गया अनुवाद नहीं है।",
    historyOriginal: "मूल",
    historyTranslation: "अनुवाद",
    historyUseAgain: "फिर से उपयोग करें",
    historyDelete: "हटाएं",
    historyItemRestored: "इतिहास आइटम बहाल किया गया।",
    historyItemRemoved: "इतिहास आइटम हटा दिया गया।",
    historyCleared: "इतिहास साफ किया गया।",
    draftCleared: "पाठ साफ किया गया। इतिहास सुरक्षित रहा।",
    lastResultRestored: "ड्राफ्ट और पिछला परिणाम बहाल किया गया।",
    pendingSelectionLoaded: "ब्राउजर से चुना गया पाठ अपने आप लोड हो गया।",
    localModePrefix: "लोकल मोड उपयोग में है। कारण:",
    sourceInfoLabel: "स्रोत",
    targetInfoLabel: "लक्ष्य",
    processingStatusBadge: "प्रोसेस हो रहा है..."
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
const uiLanguagePicker = document.getElementById("uiLanguagePicker");
const uiLanguageTrigger = document.getElementById("uiLanguageTrigger");
const uiLanguageCurrent = document.getElementById("uiLanguageCurrent");
const uiLanguageMenu = document.getElementById("uiLanguageMenu");

let appState = {
    uiLanguage: "pt",
    sourceLanguage: "auto",
    targetLanguage: "pt",
    sourceText: DEFAULT_TEXT,
    translatedText: "",
    lastResult: null,
    history: [],
    theme: "light"
};

let isUiLanguageMenuOpen = false;

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

function resolveApiBaseUrl() {
    const protocol = window.location.protocol;

    if (protocol === "http:" || protocol === "https:") {
        return window.location.origin;
    }

    return PUBLIC_APP_URL;
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
        popup: getUiText("shellPopup"),
        mobile: getUiText("shellMobile"),
        desktop: getUiText("shellDesktop")
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

function getInterfaceLanguageLabel(code) {
    return interfaceLanguageLabels[normalizeLanguageCode(code)] || languageNames[code] || code;
}

function setUiLanguageMenuOpen(open) {
    isUiLanguageMenuOpen = Boolean(open);
    uiLanguagePicker.classList.toggle("is-open", isUiLanguageMenuOpen);
    uiLanguageTrigger.setAttribute("aria-expanded", String(isUiLanguageMenuOpen));
}

function renderUiLanguageMenu() {
    uiLanguageMenu.innerHTML = layoutLanguageOptions
        .map((item) => `
            <button
                class="ui-language-option${item.value === getUiLanguage() ? " is-active" : ""}"
                type="button"
                data-language="${item.value}"
                aria-pressed="${item.value === getUiLanguage() ? "true" : "false"}"
            >
                ${getInterfaceLanguageLabel(item.value)}
            </button>
        `)
        .join("");
}

function getDetectionBadgeText(code) {
    if (code === "auto") {
        return getUiText("noDetection");
    }

    return `${getUiText("detectedPrefix")}: ${languageNames[code] || code}`;
}

function applyInterfaceLanguage() {
    const text = getUiText;

    document.documentElement.lang = getUiLanguage();
    document.querySelector(".eyebrow").textContent = text("appSubtitle");
    document.getElementById("topbarCopy").textContent = text("topbarCopy");
    document.getElementById("uiLanguageLabel").textContent = text("interfaceLabel");
    uiLanguageCurrent.textContent = getInterfaceLanguageLabel(getUiLanguage());
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
    document.querySelector(".insights-grid article:first-child h2").textContent = text("analysisTitle");
    document.querySelector(".insights-grid article:first-child .panel-copy").textContent = text("analysisCopy");
    document.querySelector(".insights-grid article:last-child h2").textContent = text("dictionaryTitle");
    document.querySelector(".insights-grid article:last-child .panel-copy").textContent = text("dictionaryCopy");
    document.querySelector(".conversation-panel h2").textContent = text("conversationTitle");
    document.querySelector(".conversation-panel .panel-copy").textContent = text("conversationCopy");

    if (!appState.lastResult && !sourceText.value.trim()) {
        statusMessage.textContent = text("readyStatus");
    }

    if (!appState.lastResult) {
        detectionBadge.textContent = getUiText("waitingDetection");
    } else {
        buildAnalysis(appState.lastResult);
        buildDictionaryPanel(appState.lastResult);
        buildConversation(appState.lastResult);
    }

    renderUiLanguageMenu();
    renderHistory();
    applyTheme(appState.theme || "light");
    applyShellMode();
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
                it: `Lingua rilevata: ${sourceName}.`,
                ja: `検出された言語: ${sourceName}.`,
                ko: `감지된 언어: ${sourceName}.`,
                zh: `检测到的语言: ${sourceName}.`,
                ru: `Определенный язык: ${sourceName}.`,
                ar: `اللغة المكتشفة: ${sourceName}.`,
                hi: `पहचानी गई भाषा: ${sourceName}.`
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
                it: `Lingua di destinazione: ${targetName}.`,
                ja: `翻訳先の言語: ${targetName}.`,
                ko: `대상 언어: ${targetName}.`,
                zh: `目标语言: ${targetName}.`,
                ru: `Язык назначения: ${targetName}.`,
                ar: `لغة الهدف: ${targetName}.`,
                hi: `लक्ष्य भाषा: ${targetName}.`
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
                it: `Tono rilevato: ${toneLabel}.`,
                ja: `検出されたトーン: ${toneLabel}.`,
                ko: `감지된 톤: ${toneLabel}.`,
                zh: `检测到的语气: ${toneLabel}.`,
                ru: `Определенный тон: ${toneLabel}.`,
                ar: `النبرة المكتشفة: ${toneLabel}.`,
                hi: `पहचाना गया टोन: ${toneLabel}.`
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
                it: "La traduzione cerca di suonare naturale nel contesto, non solo letterale.",
                ja: "この翻訳は直訳だけでなく、文脈の中で自然に聞こえることを目指します。",
                ko: "이 번역은 직역보다 문맥에서 자연스럽게 들리도록 합니다.",
                zh: "这个翻译会尽量符合语境，而不只是字面意思。",
                ru: "Перевод старается звучать естественно в контексте, а не только буквально.",
                ar: "تحاول الترجمة ان تبدو طبيعية في السياق لا حرفية فقط.",
                hi: "यह अनुवाद केवल शाब्दिक नहीं, बल्कि संदर्भ में स्वाभाविक लगे, यही कोशिश है।"
            },
            "A traducao tenta soar natural no contexto, e nao apenas literal."
        )
    ];
}

function buildAnalysis(result) {
    const items = getAnalysisItems(result);
    analysisList.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    detectionBadge.textContent = getDetectionBadgeText(result.detected);
}

function buildDictionaryPanel(result) {
    dictionaryPanel.innerHTML = `
        <article class="dictionary-entry">
            <h3>${getUiText("translatedHeading")}</h3>
            <p><strong>${result.translation}</strong></p>
            <p>${getUiText("sourceInfoLabel")}: ${languageNames[result.detected] || result.detected} | ${getUiText("targetInfoLabel")}: ${languageNames[result.target] || result.target}</p>
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
    const uiLanguage = normalizeLanguageCode(appState.uiLanguage || getBrowserLanguage());
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
    appState.uiLanguage = normalizeLanguageCode(appState.uiLanguage || getBrowserLanguage());
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
    appState.uiLanguage = normalizeLanguageCode(appState.uiLanguage || getBrowserLanguage());
    sourceLanguage.value = appState.sourceLanguage || "auto";
    targetLanguage.value = normalizeLanguageCode(appState.targetLanguage || getBrowserLanguage());
    sourceText.value = appState.sourceText || DEFAULT_TEXT;
    translatedText.value = appState.translatedText || "";
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
    statusMessage.textContent = getUiText("historyItemRestored");
}

function removeHistoryEntry(id) {
    appState.history = appState.history.filter((item) => item.id !== id);
    saveState();
    renderHistory();
    statusMessage.textContent = getUiText("historyItemRemoved");
}

function renderHistory() {
    if (!appState.history.length) {
        historyList.innerHTML = `<div class="empty-state">${getUiText("emptyHistory")}</div>`;
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
            <p class="history-preview"><strong>${getUiText("historyOriginal")}:</strong> ${entry.sourceText}</p>
            <p class="history-preview"><strong>${getUiText("historyTranslation")}:</strong> ${entry.translatedText}</p>
            <div class="history-actions">
                <button class="history-button" type="button" data-action="use" data-id="${entry.id}">${getUiText("historyUseAgain")}</button>
                <button class="history-remove" type="button" data-action="remove" data-id="${entry.id}">${getUiText("historyDelete")}</button>
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

async function runTranslation() {
    translateButton.disabled = true;
    conversationButton.disabled = true;
    detectionBadge.textContent = getUiText("processingStatusBadge");
    statusMessage.textContent = getUiText("translatingStatus");
    syncDraftState();

    try {
        const result = await fetchGeminiResult();
        updateUiWithResult(result, getUiText("translatedStatus"));
    } catch (error) {
        const result = buildLocalResult();
        updateUiWithResult(result, `${getUiText("localModePrefix")} ${error.message}`);
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
    detectionBadge.textContent = getUiText("waitingDetection");
    statusMessage.textContent = getUiText("draftCleared");
    appState.sourceText = "";
    appState.translatedText = "";
    appState.lastResult = null;
    saveState();
}

function clearHistory() {
    appState.history = [];
    saveState();
    renderHistory();
    statusMessage.textContent = getUiText("historyCleared");
}

function hydrateInitialUi() {
    if (appState.lastResult) {
        buildAnalysis(appState.lastResult);
        buildDictionaryPanel(appState.lastResult);
        buildConversation(appState.lastResult);
        detectionBadge.textContent = getDetectionBadgeText(appState.lastResult.detected);
        statusMessage.textContent = getUiText("lastResultRestored");
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
    statusMessage.textContent = getUiText("pendingSelectionLoaded");

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
    uiLanguageTrigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setUiLanguageMenuOpen(!isUiLanguageMenuOpen);
    });

    uiLanguageMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        const button = event.target.closest("button[data-language]");

        if (!button) {
            return;
        }

        appState.uiLanguage = normalizeLanguageCode(button.dataset.language);
        if (!targetLanguage.value || targetLanguage.value === normalizeLanguageCode(appState.targetLanguage || getBrowserLanguage())) {
            targetLanguage.value = appState.uiLanguage;
        }
        setUiLanguageMenuOpen(false);
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
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".ui-language-picker")) {
            setUiLanguageMenuOpen(false);
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setUiLanguageMenuOpen(false);
        }
    });
}

populateLanguageSelects();
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
