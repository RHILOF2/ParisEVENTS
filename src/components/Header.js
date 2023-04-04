import { Link } from "react-router-dom";
import "./Header.css";


function Header(){
    return(
        <div className="Header">
            <header>
                <ul>
                <li><Link to="/" className="a">Accueil</Link></li>
                <li><Link to="/recherche" className="a">Liste des événements</Link></li>
                <li><Link to="/favoris" className="a">Favoris</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default Header;