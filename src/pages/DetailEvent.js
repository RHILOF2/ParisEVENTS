import { useParams } from "react-router-dom";
import "./DetailEvent.css";
import { useEffect, useState } from "react";


function DetailEvent(){

    const params = useParams();
    const id = params.id;
    const [evenement, setEvenement] = useState({});
    console.log(id);

    useEffect(() => {
        fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`)
        .then(response => response.json())
        .then(result =>{
          setEvenement(result.record.fields);
          console.log(result);
        })
    }, []);


    return(
        <div className="DetailEvent">
            <h1>{evenement.title}</h1>
            <img src={evenement.cover_url} />
            <h3 dangerouslySetInnerHTML={{ __html: evenement.date_description }}></h3>
            <p>{evenement.lead_text}</p>
           
            <div className="moreInfo">
                <h3>Plus d'infos :</h3>
                <p>{evenement.price_detail}</p>
                <p>{evenement.address_name} - {evenement.address_street}</p>
                <p>{evenement.contact_mail}</p>
                <p>{evenement.contact_phone}</p>
                <p>{evenement.contact_facebook}</p>
            </div>                        
        </div>
    )
}

export default DetailEvent;