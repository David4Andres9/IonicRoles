import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Report.css';
import { useState } from 'react';

const Report: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          Here we go
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Report;
