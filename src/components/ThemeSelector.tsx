// components/ThemeSelector.tsx
import React from 'react';
import { IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import { colorPalette } from 'ionicons/icons';
import { useSettings, Theme } from '../contexts/SettingsContext';
import './ThemeSelector.css';

const ThemeSelector: React.FC = () => {
  const { setTheme } = useSettings();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonIcon icon={colorPalette} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={() => handleThemeChange('colors')}>
          <img src="/assets/themes/colors.png" alt="Colors" className="theme-icon" />
          
        </IonFabButton>
        <IonFabButton onClick={() => handleThemeChange('numbers')}>
          <img src="/assets/themes/numbers.png" alt="Numbers" className="theme-icon" />
        </IonFabButton>
        <IonFabButton onClick={() => handleThemeChange('animals')}>
          <img src="/assets/themes/animals.png" alt="Animals" className="theme-icon" />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default ThemeSelector;