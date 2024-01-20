import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { accessibilityOutline, logInOutline, personAdd} from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';
import Tab1 from './UserGrid';
import Tab2 from './Registry';
import { removeToken } from '../hooks/storage';


const Home: React.FC = () => {
  const history = useHistory();
  const logOut=()=>{
    removeToken();
    history.push("/Login");
  }
   
  return (
    <IonPage>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/UserGrid">
            <Tab1/>
          </Route>
          <Route path="/Registry">
            <Tab2 />
          </Route>
          <Route exact path="/Home">
            <Redirect to="/UserGrid"/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/UserGrid">
            <IonIcon aria-hidden="true" icon={accessibilityOutline} />
            <IonLabel>Users</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/Registry">
            <IonIcon aria-hidden="true" icon={personAdd} />
            <IonLabel>Registry</IonLabel>
          </IonTabButton>
          <IonTabButton tab="logoutTab" onClick={logOut}>
            <IonIcon  aria-hidden="true" icon={logInOutline} ></IonIcon>
            <IonLabel>LogOut</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </IonPage>
  );
};

export default Home;
