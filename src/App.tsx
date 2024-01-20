import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonIcon, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import { checkTokenAndRedirect, decodeRole } from './hooks/storage';
import { useEffect, useState } from 'react';
import UserGrid from './pages/UserGrid';
import { logInOutline } from 'ionicons/icons';
import RicknMortyCharacters from './pages/RicknMortyCharacters';
import MarvelCharacters from './pages/MarvelCharacters';
import Registry from './pages/Registry';

setupIonicReact();

const App: React.FC = () => {
  checkTokenAndRedirect();
  
  return(
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Login">
          <Login/>
        </Route>
        <Route exact path="/Home">
          <Home/>
        </Route>
        <Route exact path="/RicknMortyCharacters">
          <RicknMortyCharacters/>
        </Route>
        <Route exact path="/MarvelCharacters">
          <MarvelCharacters/>
        </Route>
        <Route exact path="/">
          <Redirect to="/Login"/>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
