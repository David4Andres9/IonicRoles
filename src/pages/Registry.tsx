import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';

import './Registry.css';
import { save } from 'ionicons/icons';
import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../hooks/storage';
import User from '../Models/UserModel';
import { IonToast } from '@ionic/react';

const Registry: React.FC = () => {

  const [formData, setFormData] =  useState<User>({
    dni: null,
    userName: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    rol: null,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [color, setcolor] = useState("suceess");

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    if (key === 'email') {
      const userName = value.split('@')[0];
      setFormData((prevData) => ({ ...prevData, [key]: value, userName }));
    } else {
      setFormData((prevData) => ({ ...prevData, [key]: value }));
    }
  };
  const enterData =()=>{

    axios.post('https://localhost:44330/api/Users/CreateUpdateUser', formData, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then((response) => {
        if(response.data.success==true){
          setFormData({
            dni: null,
            userName: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            rol: null,
          });
          setShowToast(true);
          setToastMessage('Registro exitoso');
          setcolor("success");
        }else{
          setShowToast(true);
          setToastMessage('Registro fallido'+ response);
          setcolor("danger");
        }
        
      })
      .catch((error) => {
        setShowToast(true);
          setToastMessage('Registro fallido'+ error);
          setcolor("danger");
      });
  }

  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000} 
        position="top"
        color={color}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="ligth" className="ion-padding">
      <IonCard className="loginCardRegistry">
        <IonCardHeader>
          <IonCardSubtitle>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
        <IonList>
          <IonItem>
            <IonInput label="Dni" labelPlacement="floating" counter={true} maxlength={10} clearInput={true} onIonChange={(e) =>handleInputChange('dni', e.detail.value!) } value={formData.dni}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="First Name" labelPlacement="floating"  counter={true} maxlength={50} clearInput={true} onIonChange={(e) =>handleInputChange('firstName', e.detail.value!)} value={formData.firstName}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Last Name" labelPlacement="floating" counter={true} maxlength={50} clearInput={true} onIonChange={(e) =>handleInputChange('lastName', e.detail.value!)} value={formData.lastName}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Email" labelPlacement="floating" counter={true} maxlength={50} type="email" clearInput={true} onIonChange={(e) =>handleInputChange('email', e.detail.value!)} value={formData.email}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Password" labelPlacement="floating" counter={true} maxlength={50} clearInput={true} type="password" onIonChange={(e) =>handleInputChange('password', e.detail.value!)} value={formData.password}></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label="Rol" placeholder="Select Rol" onIonChange={(e) =>handleInputChange('rol', e.detail.value!)} value={formData.rol}>
              <IonSelectOption value="ADMN">Administrador</IonSelectOption>
              <IonSelectOption value="TBJR">Trabajador Operativo</IonSelectOption>
              <IonSelectOption value="SPTI">Soporte TI</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        </IonCardContent>
      </IonCard>
      <IonButton color="medium" expand="block" shape="round" onClick={enterData}>
        Registry
        <IonIcon slot="start" icon={save} ></IonIcon>
      </IonButton>
      
      </IonContent>
    </IonPage>
  );
};

export default Registry;
