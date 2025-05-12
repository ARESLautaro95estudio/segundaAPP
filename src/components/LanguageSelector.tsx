// components/LanguageSelector.tsx
import React from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { language } from 'ionicons/icons';
import { useSettings, Language } from '../contexts/SettingsContext';
import './LanguageSelector.css';
import spainFlag from '../assets/flags/spain.png';
import ukFlag from '../assets/flags/UK.png';
import brazilFlag from '../assets/flags/brazil.png';
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
          <img src={spainFlag} alt="Español" className="flag-icon" />
        </IonFabButton>
        <IonFabButton onClick={() => handleLanguageChange('en')}>
          <img src={ukFlag} alt="English" className="flag-icon" />
        </IonFabButton>
        <IonFabButton onClick={() => handleLanguageChange('pt')}>
          <img src={brazilFlag} alt="Português" className="flag-icon" />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default LanguageSelector;