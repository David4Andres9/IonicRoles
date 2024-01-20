import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';

import './Login.css';
import { lockClosed, logIn, person } from 'ionicons/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { checkTokenAndRedirect, decodeRole, saveToken } from '../hooks/storage';

const Login: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    user: null, password: null
  });
  
  const usehistory = useHistory();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({ 
      ...loginData,
      [name]: value
    })
  }

  const login =()=>{
    axios.post('https://localhost:44330/api/Users/Login', loginData)
    .then((response)=>{
        if(response.data.success==true){
          saveToken(response.data.result);
          const role = decodeRole();
          if (role === "ADMN"){
            history.push("/Home");
          }else if (role === "TBJR"){
            history.push("/MarvelCharacters");
          }else if(role=== "SPTI"){
            history.push("/RicknMortyCharacters");
          }
          setLoginData({
            user: null,
            password: null
          });
        }else{
          setLoginData({
            user: null,
            password: null
          });
          setShowToast(true);
          setToastMessage('Login Failed');
        }
      }
    )
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={5000}
        position="top"
        color="danger"
      />
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen color="ligth" className="ion-padding">
        <IonCard className="loginCard">
          <br/>
            <center>
              <img alt="image" src="../../public/logo_puce.png" id="logoImage"/>
            </center>
          <br/>
          <IonCardContent>
            <IonGrid fixed={true}>
              <IonRow>
                <IonCol size="2">
                <IonIcon aria-hidden="true" icon={person} size="large"/>
                </IonCol>
                <IonCol size="10">
                  <IonInput placeholder="Enter your Username" maxlength={20} 
                    name="user"
                    value={loginData.user}
                    onInput={(e)=> handleInputChange(e)}
                  >
                  </IonInput>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid fixed={true}>
              <IonRow>
                <IonCol size="2">
                  <IonIcon aria-hidden="true" icon={lockClosed} size="large" />
                </IonCol>
                <IonCol size="10">
                  <IonInput placeholder="Enter your password" type="password"
                    name="password"
                    value={loginData.password}
                    onInput={(e)=> handleInputChange(e)}
                  >
                  </IonInput>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonButton  color="medium" expand="block" shape="round" onClick={login}>
              Login
              <IonIcon  color="dark" slot="start" icon={logIn} ></IonIcon>
            </IonButton>
            <br/><br/><br/>
            <center>
              <h6>
                For your safety, do not share your password with third parties.
              </h6>
            </center>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
