import "./Favorites.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Favorites(){
    const [evenements, setEvenements] = useState([]);
    const [buttonText, setButtonText] = useState("");


    useEffect(() => {
        const allEvents = localStorage.getItem("evenements");
        if (allEvents) {
          const cardObject = JSON.parse(allEvents);
          setEvenements(cardObject);
        }
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

    function removeEvent(evenement){
        let allEvents = getEvent();
        let findEvent = allEvents.find(e => e.id == evenement.id);
        let eventIndex = allEvents.indexOf(findEvent);

        allEvents.splice(eventIndex, 1);
        saveEvent(allEvents);
        window.location.reload();
    }


    return(
        <div className="Favorites">
            <h1>Vos évenements favoris</h1>

            {evenements.map(evenement =>(
                    <div className="card" key={evenement.id}>
                        <img src={evenement.cover_url} />
                        <h3>{evenement.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: evenement.date_description }}></p>
                        <p>{evenement.lead_text}</p>
                        <div className="button">
                            <Link to={`/evenementDetail/${evenement.customId}`} className="link" >VOIR</Link>
                            <button onClick={() => { removeEvent(evenement)}}>SUPPRIMER</button>
                        </div>
                    </div>
                ))}
        </div>


    )

}

export default Favorites;