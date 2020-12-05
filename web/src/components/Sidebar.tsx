import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from '../images/map-marker.svg';
import { useHistory } from 'react-router-dom';
import '../styles/components/sidebar.css'


// <aside> que estava presente na página e foi abstraida para um componente react
export default function Sidebar(){
    const { goBack } = useHistory(); // voltar para página anterior utlizando a função do react-router-dom
    return(
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" /> {/* Adiciona icone Marker como logo */}

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" /> {/* Adiciona botão de voltar */}
                </button>
            </footer>
        </aside>
    );
}