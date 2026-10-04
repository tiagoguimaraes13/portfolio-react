import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import translations from "./translations.json";
export const languages = {
  en: "English",
  et: "Eesti",
  ru: "Русский",
  fi: "Suomi",
};
export function translate(text, language = "en") {
  if (typeof text !== "string" || language === "en") return text;
  return translations[text]?.[language] || text;
}
const LanguageContext = createContext({
  language: "en",
  t: (text) => text,
  setLanguage: () => {},
});
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("toimu-language");
      return languages[saved] ? saved : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("toimu-language", language);
    } catch {}
  }, [language]);
  const value = useMemo(
    () => ({ language, setLanguage, t: (text) => translate(text, language) }),
    [language]
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <label className="language-switcher">
      <span className="sr-only">{t("Website language")}</span>
      <select
        aria-label={t("Website language")}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code} lang={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
