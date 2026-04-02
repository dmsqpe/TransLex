const MENU_ROOT_ID = "translex-root";
const MENU_OPEN_POPUP_ID = "translex-open-popup";
const MENU_TARGET_PREFIX = "translex-target-";

const targetLanguages = [
    { code: "pt", label: "Portugues" },
    { code: "en", label: "Ingles" },
    { code: "es", label: "Espanhol" },
    { code: "fr", label: "Frances" },
    { code: "de", label: "Alemao" },
    { code: "it", label: "Italiano" },
    { code: "ja", label: "Japones" }
];

function createContextMenu() {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: MENU_ROOT_ID,
            title: 'Traduzir com TransLex: "%s"',
            contexts: ["selection"]
        }, () => {
            void chrome.runtime.lastError;
        });

        chrome.contextMenus.create({
            id: MENU_OPEN_POPUP_ID,
            parentId: MENU_ROOT_ID,
            title: "Abrir tradutor",
            contexts: ["selection"]
        }, () => {
            void chrome.runtime.lastError;
        });

        targetLanguages.forEach((language) => {
            chrome.contextMenus.create({
                id: `${MENU_TARGET_PREFIX}${language.code}`,
                parentId: MENU_ROOT_ID,
                title: `Traduzir para ${language.label}`,
                contexts: ["selection"]
            }, () => {
                void chrome.runtime.lastError;
            });
        });
    });
}

async function openTranslatorWindow() {
    try {
        if (chrome.action?.openPopup) {
            await chrome.action.openPopup();
            return;
        }
    } catch (error) {
        // Alguns navegadores bloqueiam a abertura programatica do popup.
    }

    await chrome.windows.create({
        url: chrome.runtime.getURL("Extensao.html"),
        type: "popup",
        width: 460,
        height: 820
    });
}

async function storePendingSelection(selectionText, targetLanguage) {
    await chrome.storage.local.set({
        pendingSelectionText: selectionText,
        pendingSelectionTarget: targetLanguage || ""
    });
}

function getTargetLanguageFromMenuId(menuItemId) {
    if (!menuItemId.startsWith(MENU_TARGET_PREFIX)) {
        return "";
    }

    return menuItemId.slice(MENU_TARGET_PREFIX.length);
}

createContextMenu();

chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
    createContextMenu();
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (!info.selectionText) {
        return;
    }

    if (info.menuItemId === MENU_OPEN_POPUP_ID) {
        await storePendingSelection(info.selectionText, "");
        await openTranslatorWindow();
        return;
    }

    const targetLanguage = getTargetLanguageFromMenuId(String(info.menuItemId));

    if (!targetLanguage) {
        return;
    }

    await storePendingSelection(info.selectionText, targetLanguage);
    await chrome.storage.local.set({
        preferredTargetLanguage: targetLanguage
    });
    await openTranslatorWindow();
});
