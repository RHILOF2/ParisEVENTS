import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home(){
    const [evenements, setEvenements] = useState([]);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?order_by=date_start desc&limit=1")
        .then(response => response.json())
        .then(result =>{
          setEvenements(result.records.map(item => item.record));
        })
    }, []);
    

    function saveEvent(evenement) {
        localStorage.setItem("evenements", JSON.stringify(evenement));
    }

    function getEvent() {
        let allEvents = localStorage.getItem("evenements");
        if(allEvents == null){
            return [];
        }else{
            return JSON.parse(allEvents);
        }
    }

    function addEvent(evenement, idForSee){
        let allEvents = getEvent();
        let findEvent = allEvents.find(e => e.id == evenement.id);
        let eventIndex = allEvents.indexOf(findEvent);
        const changeText = (text) => setButtonText(text);
        evenement["customId"] = idForSee;

        if(findEvent != undefined){
            allEvents.splice(eventIndex, 1);
            changeText("ENREGISTER");
        }else{
            allEvents.push(evenement);
            changeText("ENREGISTRÉ");
        }
        saveEvent(allEvents);
    }

    //Fonction qui sert à mettre le bon texte dans le bouton en fonction de si l'evenement est enregistrée dans le localStorage ou pas
    function defaultText(evenement){
        const allEvents = getEvent();
        let findEvent = allEvents.find(e => e.id == evenement.id);

        if(findEvent != undefined){
            return "ENREGISTRÉ"
        }else{
            return "ENREGISTRER"
        }
        
    }


    return(
        <div className="Home">
            <h1>Bienvenue sur Paris Events</h1>

            <p>L'application qui permet de rechercher en direct les prochains événements Parisiens</p>

            <div className="line"></div>
    
            <h3>Actualité</h3>

            <p>Le dernier événement publié :</p>

            <div className="container_card">

                {evenements.map(evenement =>(
                    <div className="card" key={evenement.fields.id}>
                        <img src={evenement.fields.cover_url} />
                        <h3>{evenement.fields.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: evenement.fields.date_description }}></p>
                        <p>{evenement.fields.lead_text}</p>
                        <div className="button">
                            <Link to={`/evenementDetail/${evenement.id}`} className="link" >VOIR</Link>
                            <button onClick={() => { addEvent(evenement.fields, evenement.id)}}>{defaultText(evenement.fields)}</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}


export default Home;