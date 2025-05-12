// pages/Animals.tsx
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
import './Animals.css';

// Contenido para la página de animales
const animalData = {
  es: [
    { name: 'PERRO', imgSrc: '/assets/images/animals/dog.jpg', audio: '/assets/audio/es/perro.mp3' },
    { name: 'GATO', imgSrc: '/assets/images/animals/cat.jpg', audio: '/assets/audio/es/gato.mp3' },
    { name: 'CABALLO', imgSrc: '/assets/images/animals/horse.jpg', audio: '/assets/audio/es/caballo.mp3' },
    { name: 'LEÓN', imgSrc: '/assets/images/animals/lion.jpg', audio: '/assets/audio/es/leon.mp3' },
    { name: 'ELEFANTE', imgSrc: '/assets/images/animals/elephant.jpg', audio: '/assets/audio/es/elefante.mp3' },
  ],
  en: [
    { name: 'DOG', imgSrc: '/assets/images/animals/dog.jpg', audio: '/assets/audio/en/dog.mp3' },
    { name: 'CAT', imgSrc: '/assets/images/animals/cat.jpg', audio: '/assets/audio/en/cat.mp3' },
    { name: 'HORSE', imgSrc: '/assets/images/animals/horse.jpg', audio: '/assets/audio/en/horse.mp3' },
    { name: 'LION', imgSrc: '/assets/images/animals/lion.jpg', audio: '/assets/audio/en/lion.mp3' },
    { name: 'ELEPHANT', imgSrc: '/assets/images/animals/elephant.jpg', audio: '/assets/audio/en/elephant.mp3' },
  ],
  pt: [
    { name: 'CACHORRO', imgSrc: '/assets/images/animals/dog.jpg', audio: '/assets/audio/pt/cachorro.mp3' },
    { name: 'GATO', imgSrc: '/assets/images/animals/cat.jpg', audio: '/assets/audio/pt/gato.mp3' },
    { name: 'CAVALO', imgSrc: '/assets/images/animals/horse.jpg', audio: '/assets/audio/pt/cavalo.mp3' },
    { name: 'LEÃO', imgSrc: '/assets/images/animals/lion.jpg', audio: '/assets/audio/pt/leao.mp3' },
    { name: 'ELEFANTE', imgSrc: '/assets/images/animals/elephant.jpg', audio: '/assets/audio/pt/elefante.mp3' },
  ]
};

// Traducciones para los títulos
const translations = {
  es: { title: 'ANIMALES' },
  en: { title: 'ANIMALS' },
  pt: { title: 'ANIMAIS' }
};

const Animals: React.FC = () => {
  const { language } = useSettings();
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const animals = animalData[language];
  const t = translations[language];

  // Precargar los audios
  useEffect(() => {
    audioRefs.current = animals.map((_, i) => audioRefs.current[i] || new Audio());
    
    // Actualizar las fuentes de audio cuando cambia el idioma
    animals.forEach((animal, index) => {
      if (audioRefs.current[index]) {
        audioRefs.current[index].src = animal.audio;
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
  }, [language, animals]);

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
            {animals.map((animal, index) => (
              <IonCol key={index} size="12">
                <IonButton
                  expand="block"
                  className="animal-button"
                  onClick={() => playAudio(index)}
                >
                  <div className="animal-container">
                    <div className="animal-image-container">
                      <img src={animal.imgSrc} alt={animal.name} className="animal-image" />
                    </div>
                    <div className="animal-name">{animal.name}</div>
                    <IonIcon icon={volumeHighOutline} className="volume-icon" />
                  </div>
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

export default Animals;