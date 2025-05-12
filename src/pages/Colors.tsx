// pages/Colors.tsx
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
import './Colors.css';

// Contenido para la página de colores
const colorData = {
  es: [
    { name: 'ROJO', color: '#FF0000', audio: '/assets/audio/es/rojo.mp3' },
    { name: 'AZUL', color: '#0000FF', audio: '/assets/audio/es/azul.mp3' },
    { name: 'VERDE', color: '#00FF00', audio: '/assets/audio/es/verde.mp3' },
    { name: 'AMARILLO', color: '#FFFF00', audio: '/assets/audio/es/amarillo.mp3' },
    { name: 'NEGRO', color: '#000000', audio: '/assets/audio/es/negro.mp3' },
  ],
  en: [
    { name: 'RED', color: '#FF0000', audio: '/assets/audio/en/red.mp3' },
    { name: 'BLUE', color: '#0000FF', audio: '/assets/audio/en/blue.mp3' },
    { name: 'GREEN', color: '#00FF00', audio: '/assets/audio/en/green.mp3' },
    { name: 'YELLOW', color: '#FFFF00', audio: '/assets/audio/en/yellow.mp3' },
    { name: 'BLACK', color: '#000000', audio: '/assets/audio/en/black.mp3' },
  ],
  pt: [
    { name: 'VERMELHO', color: '#FF0000', audio: '/assets/audio/pt/vermelho.mp3' },
    { name: 'AZUL', color: '#0000FF', audio: '/assets/audio/pt/azul.mp3' },
    { name: 'VERDE', color: '#00FF00', audio: '/assets/audio/pt/verde.mp3' },
    { name: 'AMARELO', color: '#FFFF00', audio: '/assets/audio/pt/amarelo.mp3' },
    { name: 'PRETO', color: '#000000', audio: '/assets/audio/pt/preto.mp3' },
  ]
};

// Traducciones para los títulos
const translations = {
  es: { title: 'COLORES' },
  en: { title: 'COLORS' },
  pt: { title: 'CORES' }
};

const Colors: React.FC = () => {
  const { language } = useSettings();
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const colors = colorData[language];
  const t = translations[language];

  // Precargar los audios
  useEffect(() => {
    audioRefs.current = colors.map((_, i) => audioRefs.current[i] || new Audio());
    
    // Actualizar las fuentes de audio cuando cambia el idioma
    colors.forEach((color, index) => {
      if (audioRefs.current[index]) {
        audioRefs.current[index].src = color.audio;
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
  }, [language, colors]);

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
            {colors.map((color, index) => (
              <IonCol key={index} size="12">
                <IonButton
                  expand="block"
                  className="color-button"
                  style={{ 
                    '--background': color.color,
                    '--color': color.color === '#FFFF00' || color.color === '#00FF00' ? 'black' : 'white'
                  } as any}
                  onClick={() => playAudio(index)}
                >
                  {color.name}
                  <IonIcon icon={volumeHighOutline} slot="end" />
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

export default Colors;