import React, { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import User from '../Models/UserModel';

import './UserGrid.css';
import { getToken } from '../hooks/storage';
import axios from 'axios';

function UserGrid() {
    const [userList, setUserList] = useState<User[]>([]);
    useEffect(() => {
        axios.get("https://localhost:44330/api/Users/GetAllUsers", {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          })
          .then((response) => {
            const users = response.data;
            if (users && users.length > 0) {
                setUserList(users);
            }
            })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  return (
        <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Users</IonTitle>
        </IonToolbar>
        </IonHeader>
        <br/>
        <br/>
        <br/>
        <IonGrid fixed={true}>
        <IonRow>
            <IonCol>
            <IonTitle>DNI</IonTitle>
            </IonCol>
            <IonCol>
            <IonTitle>User Name</IonTitle>
            </IonCol>
            <IonCol>
            <IonTitle>Email</IonTitle>
            </IonCol>
            <IonCol>
            <IonTitle>Rol</IonTitle>
            </IonCol>
        </IonRow>
        <br/>
        {userList.map((user) => (
            <IonRow key={user.ideUser}>
            <IonCol>{user.dni}</IonCol>
            <IonCol>{user.userName}</IonCol>
            <IonCol>{user.email}</IonCol>
            <IonCol>{user.rol}</IonCol>
            </IonRow>
        ))}
        </IonGrid>
    </IonPage>
  );
}
export default UserGrid;