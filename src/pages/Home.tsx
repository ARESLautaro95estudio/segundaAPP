// pages/Home.tsx
import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon
} from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSelector from '../components/ThemeSelector';
import './Home.css';

// Traducciones para los textos de la página
const translations = {
  es: {
    title: 'Aprende Idiomas',
    welcome: 'Bienvenido',
    colors: 'COLORES',
    numbers: 'NÚMEROS',
    animals: 'ANIMALES',
    fruits: 'FRUTAS',
    vehicles: 'VEHÍCULOS',
    logout: 'Cerrar Sesión'
  },
  en: {
    title: 'Learn Languages',
    welcome: 'Welcome',
    colors: 'COLORS',
    numbers: 'NUMBERS',
    animals: 'ANIMALS',
    fruits: 'FRUITS',
    vehicles: 'VEHICLES',
    logout: 'Sign Out'
  },
  pt: {
    title: 'Aprenda Idiomas',
    welcome: 'Bem-vindo',
    colors: 'CORES',
    numbers: 'NÚMEROS',
    animals: 'ANIMAIS',
    fruits: 'FRUTAS',
    vehicles: 'VEÍCULOS',
    logout: 'Sair'
  }
};

const Home: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { language } = useSettings();
  const t = translations[language];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSignOut}>
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>{t.welcome}, {currentUser?.displayName || 'Usuario'}</h2>
        
        <IonGrid className="full-height-grid">
          <IonRow className="full-height-row">
            <IonCol size="12" sizeMd="4">
              <IonButton 
                expand="block" 
                routerLink="/colors" 
                className="big-button color-button"
              >
                {t.colors}
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonButton 
                expand="block" 
                routerLink="/numbers" 
                className="big-button number-button"
              >
                {t.numbers}
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonButton 
                expand="block" 
                routerLink="/animals" 
                className="big-button animal-button"
              >
                {t.animals}
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonButton 
                expand="block" 
                className="big-button fruit-button"
              >
                {t.fruits}
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonButton 
                expand="block" 
                className="big-button vehicle-button"
              >
                {t.vehicles}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <LanguageSelector />
        <ThemeSelector />
      </IonContent>
    </IonPage>
  );
};

export default Home;