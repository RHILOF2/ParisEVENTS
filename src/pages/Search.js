import "./Search.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Search(){
    const [evenements, setEvenements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [accessButton, setAccessButton] = useState([]);
    const [buttonText, setButtonText] = useState("");

    //Filter the search
    useEffect(() => {
        fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?order_by=date_start desc, title asc")
        .then(response => response.json())
        .then(result =>{
          setEvenements(result.records.map(item => item.record.fields));
        })
    }, []);

    //Button acces detailEVent
    useEffect(() => {
        fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?order_by=date_start desc, title asc")
        .then(response => response.json())
        .then(result =>{
          setAccessButton(result.records.map(item => item.record));
        })
    }, []);

    console.log("####", accessButton[0])

    const handleSearchTerm = (e) =>{        
        let value = e.target.value;
        value.length > 2 && setSearchTerm(value);
    }

    function saveEvent(evenement) {
        localStorage.setItem("evenements", JSON.stringify(evenement));
    }

    function getEvent() {
        let all_events = localStorage.getItem("evenements");
        if(all_events == null){
            return [];
        }else{
            return JSON.parse(all_events);
        }
    }

    function addEvent(evenement){
        let all_events = getEvent();
        let findEvent = all_events.find(e => e.id == evenement.id);
        console.log(all_events.indexOf(findEvent));
        let eventIndex = all_events.indexOf(findEvent);
        const changeText = (text) => setButtonText(text);

        //console.log(findEvent, "***");
        if(findEvent != undefined){
            all_events.splice(eventIndex, 1);
            changeText("ENREGISTER");
        }else{
            all_events.push(evenement);
            changeText("ENREGISTRÉ");
        }
        saveEvent(all_events);
    }

    //Fonction qui sert à mettre le bon texte dans le bouton en fonction de si l'evenement est enregistrée dans le localStorage ou pas
    function defaultText(evenement){
        const all_events = getEvent();
        let findEvent = all_events.find(e => e.id == evenement.id);

        if(findEvent != undefined){
            return "ENREGISTRÉ"
        }else{
            return "ENREGISTRER"
        }
        
    }

    return(
        <div className="Search">
            <h1>Lister de futurs événements à Paris</h1>
            <form>
                <input 
                id="searchbar" 
                type="text" 
                name="searchBar" 
                placeholder="Mon événement.." 
                onChange={handleSearchTerm}
                />

                <button 
                className="btn_search" 
                id="search_" 
                type="button" 
                onClick="">Rechercher</button>
            </form>   

            <div className="search_results">
                <h3>Résultats de la recherche :</h3>    
                {evenements.filter((val) =>{
                    return val.title && val.title.toLowerCase().includes(searchTerm.toLowerCase());

                }).map((val, index) =>(
                    <div className="search_result" key={val.id}>
                        <img src={val.cover_url} />
                        <h3>{val.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: val.date_description }}></p>
                        <p>{val.lead_text}</p>
                        <div className="button">
                            <Link to={`/evenementDetail/${accessButton[index]}`} className="link">VOIR</Link>
                            <button onClick={() => { addEvent(val)}}>{defaultText(val)}</button>
                        </div>
                    </div>  
                ))}
                   
            </div>         
        </div>


    )
}

export default Search;