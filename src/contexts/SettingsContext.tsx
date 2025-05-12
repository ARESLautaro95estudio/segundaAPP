// contexts/SettingsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para las configuraciones
export type Language = 'es' | 'en' | 'pt';
export type Theme = 'colors' | 'numbers' | 'animals';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  language: 'es',
  theme: 'colors',
  setLanguage: () => {},
  setTheme: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cargar configuraciones guardadas o usar valores predeterminados
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'colors';
  });

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ language, theme, setLanguage, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};