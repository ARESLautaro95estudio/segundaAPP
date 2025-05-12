// pages/Numbers.tsx
import React, { useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import { volumeHighOutline } from 'ionicons/icons';
import { useSettings } from '../contexts/SettingsContext';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSelector from '../components/ThemeSelector';
import './Numbers.css';

// Contenido para la página de números
const numberData = {
  es: [
    { name: 'UNO', value: '1', audio: '/assets/audio/es/uno.mp3', bgColor: '#FF9800' },
    { name: 'DOS', value: '2', audio: '/assets/audio/es/dos.mp3', bgColor: '#2196F3' },
    { name: 'TRES', value: '3', audio: '/assets/audio/es/tres.mp3', bgColor: '#4CAF50' },
    { name: 'CUATRO', value: '4', audio: '/assets/audio/es/cuatro.mp3', bgColor: '#9C27B0' },
    { name: 'CINCO', value: '5', audio: '/assets/audio/es/cinco.mp3', bgColor: '#f44336' },
  ],
  en: [
    { name: 'ONE', value: '1', audio: '/assets/audio/en/one.mp3', bgColor: '#FF9800' },
    { name: 'TWO', value: '2', audio: '/assets/audio/en/two.mp3', bgColor: '#2196F3' },
    { name: 'THREE', value: '3', audio: '/assets/audio/en/three.mp3', bgColor: '#4CAF50' },
    { name: 'FOUR', value: '4', audio: '/assets/audio/en/four.mp3', bgColor: '#9C27B0' },
    { name: 'FIVE', value: '5', audio: '/assets/audio/en/five.mp3', bgColor: '#f44336' },
  ],
  pt: [
    { name: 'UM', value: '1', audio: '/assets/audio/pt/um.mp3', bgColor: '#FF9800' },
    { name: 'DOIS', value: '2', audio: '/assets/audio/pt/dois.mp3', bgColor: '#2196F3' },
    { name: 'TRÊS', value: '3', audio: '/assets/audio/pt/tres.mp3', bgColor: '#4CAF50' },
    { name: 'QUATRO', value: '4', audio: '/assets/audio/pt/quatro.mp3', bgColor: '#9C27B0' },
    { name: 'CINCO', value: '5', audio: '/assets/audio/pt/cinco.mp3', bgColor: '#f44336' },
  ]
};

// Traducciones para los títulos
const translations = {
  es: { title: 'NÚMEROS' },
  en: { title: 'NUMBERS' },
  pt: { title: 'NÚMEROS' }
};

const Numbers: React.FC = () => {
  const { language } = useSettings();
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const numbers = numberData[language];
  const t = translations[language];

  // Precargar los audios
  useEffect(() => {
    audioRefs.current = numbers.map((_, i) => audioRefs.current[i] || new Audio());
    
    // Actualizar las fuentes de audio cuando cambia el idioma
    numbers.forEach((number, index) => {
      if (audioRefs.current[index]) {
        audioRefs.current[index].src = number.audio;
        audioRefs.current[index].load();
      }
    });

    // Limpiar al desmontar
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [language, numbers]);

  const playAudio = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error('Error playing audio:', e));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{t.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="full-height-grid">
          <IonRow className="full-height-row">
            {numbers.map((number, index) => (
              <IonCol key={index} size="12">
                <IonButton
                  expand="block"
                  className="number-button"
                  style={{ '--background': number.bgColor } as any}
                  onClick={() => playAudio(index)}
                >
                  <div className="number-content">
                    <div className="number-value">{number.value}</div>
                    <div className="number-name">{number.name}</div>
                  </div>
                  <IonIcon icon={volumeHighOutline} size="large" className="volume-icon" />
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <LanguageSelector />
        <ThemeSelector />
      </IonContent>
    </IonPage>
  );
};

export default Numbers;