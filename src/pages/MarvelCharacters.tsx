import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonPage } from '@ionic/react';
import axios from 'axios';
import { getToken, removeToken } from '../hooks/storage';
import { useEffect, useState } from 'react';
import MarvelCharacter from '../Models/MarvelCharacterModel';
import './MarvelCharacters.css';
import { useHistory } from 'react-router';
import { logOutOutline } from 'ionicons/icons';

function MarvelCharacters(){
    const history = useHistory();
    const logOut=()=>{
        removeToken();
        history.push("/Login");
    }
    const [marvelCharacters, setMarvelCharacters] = useState<MarvelCharacter[]>([]);
    useEffect(() => {
        axios.get("https://localhost:44330/api/MarvelCharacters/GetMarvelCharacters", {
                headers: {
                Authorization: `Bearer ${getToken()}`
                }
            })
            .then((response) => {
                setMarvelCharacters(response.data);
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
                {marvelCharacters.map((character) => (
                <IonCard key={character.ideCharacter} className="small-card">
                    <img src={character.thumbnail} alt={character.name} className="thumbnail" />
                    <IonCardHeader>
                    <IonCardTitle>{character.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    {character.description}
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

export default MarvelCharacters;