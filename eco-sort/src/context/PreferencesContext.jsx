import { createContext, useContext, useEffect, useState } from 'react';
import { loadPrefs, savePrefs } from '../lib/storage';
import { getLanguage } from '../i18n/translations';

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(() => loadPrefs() || {});

  useEffect(() => {
    const theme = prefs.theme || 'light';
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    const lang = getLanguage(prefs.language || 'en');
    root.setAttribute('dir', lang.dir);
    root.setAttribute('lang', lang.code);
  }, [prefs]);

  const updatePrefs = (next) => {
  const merged = { ...(prefs || {}), ...next };
  setPrefs(merged);
  savePrefs(merged);
};

  return (
    <PreferencesContext.Provider value={{ prefs, updatePrefs }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within provider');
  return ctx;
}