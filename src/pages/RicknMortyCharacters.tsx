import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonPage } from '@ionic/react';
import axios from 'axios';
import { getToken, removeToken } from '../hooks/storage';
import { useHistory } from 'react-router';
import RicknmortyCharacter from '../Models/RnMModel';
import { useEffect, useState } from 'react';
import { logOutOutline } from 'ionicons/icons';
import './RicknMortyCharacters.css';

function RicknMortyCharacters(){
    const history = useHistory();
    const logOut=()=>{
        removeToken();
        history.push("/Login");
    }
    const [mortyCharacters, setMortyCharacters] = useState<RicknmortyCharacter[]>([]);
    useEffect(() => {
        axios.get("https://localhost:44330/api/RicknmortyCharacters/GetRnMCharacters", {
                headers: {
                Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                setMortyCharacters(response.data);
                })
            .catch((error) => {
                console.error(error);
            });
        }, []);
    return(
        <IonPage>
        <IonContent>
            <div className="centered-container">
            <div className="small-card-container">
                {mortyCharacters.map((character) => (
                <IonCard key={character.ideCharacter} className="small-card">
                    <img src={character.image} alt={character.name} className="thumbnail" />
                    <IonCardHeader>
                    <IonCardTitle>{character.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    {character.species}
                    </IonCardContent>
                </IonCard>
                ))}
            </div>
            </div>
        </IonContent>
        <IonButton onClick={logOut}>Logout
        <IonIcon  color="dark" slot="start" icon={logOutOutline} ></IonIcon>
        </IonButton>
        </IonPage>
    );

};

export default RicknMortyCharacters;