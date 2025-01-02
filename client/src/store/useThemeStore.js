"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useThemeStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    theme: "light",
    setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
    },
    loadThemeFromStorage: (storageKey, defaultTheme) => {
        const storedTheme = localStorage.getItem(storageKey) || defaultTheme;
        set({ theme: storedTheme });
    },
    initializeTheme: () => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("vite-ui-theme");
            const themeToApply = storedTheme;
            const root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(themeToApply);
            set({ theme: themeToApply });
        }
    },
}), {
    name: "theme-store",
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
