// components/LanguageSelector.tsx
import React from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { language } from 'ionicons/icons';
import { useSettings, Language } from '../contexts/SettingsContext';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { setLanguage } = useSettings();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <IonFab vertical="bottom" horizontal="start" slot="fixed">
      <IonFabButton>
        <IonIcon icon={language} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={() => handleLanguageChange('es')}>
          <img src="/assets/flags/spain.png" alt="Español" className="flag-icon" />
        </IonFabButton>
        <IonFabButton onClick={() => handleLanguageChange('en')}>
          <img src="/assets/flags/UK.png" alt="English" className="flag-icon" />
        </IonFabButton>
        <IonFabButton onClick={() => handleLanguageChange('pt')}>
          <img src="/assets/flags/brazil.png" alt="Português" className="flag-icon" />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default LanguageSelector;