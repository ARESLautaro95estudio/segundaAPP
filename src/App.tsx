// En cada App.tsx, reemplaza el contenido con este código:
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Importar CSS de Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

// Importar páginas y componentes
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AnimatedSplash from './components/AnimatedSplash';
import { SplashScreen } from '@capacitor/splash-screen';

setupIonicReact();

const App: React.FC = () => { 
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    SplashScreen.hide().catch(error => console.error('Error hiding splash screen', error));
  }, []);
  
  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <AnimatedSplash onFinished={handleSplashFinished} />;
  }

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;