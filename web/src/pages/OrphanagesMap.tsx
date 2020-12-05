import React , { useEffect, useState } from 'react';
import api from '../services/api'
import mapMarkerImg from '../images/map-marker.svg'; // Importar imagem da pasta /images/
import { Link } from 'react-router-dom'; // Importar Link do react-router-dom
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'; // TileLayer: Recupera as imagens do mapa. Marker: marcações no mapa
import mapIcon from '../utils/mapIcon'
import '../styles/pages/orphanages-map.css';


interface Orphanages { // interface que permite o front end identificar o tipo da variável (typescript)
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanages[]>([]); // desestruturação. [array, função que atualiza array]

    console.log(orphanages);
    
    useEffect(() => {
        api.get('orphanages').then(response => { // rota orphanages > recebe da api e joga no parâmetro response
            setOrphanages(response.data); // função que atualiza array com os dados da api
            // ao utilizar setOrphanages, a função OrphanagesMap é chamda novamente: Ciclo de renderização
        }); 
    }, []);
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>

                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map 
                center={[ -22.8744843, -43.3004858 ]} // Latitute e longitude, retirado da URL do Google Maps
                zoom={15} // Zoom, também retirado do Google Maps
                style={{ width: '100%', height: '100%' }} // Duas chaves, adicionar css
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orphanages.map(orphanage => { // atualiza dados de orfanatos dinamicamente. 
                // orphanage > parâmetro >  um único orfanato, utilizado no MAP
                // orphanages > variável que armazena todos os orfanatos 
                    return (
                            <Marker // marcações no mapa
                                key = {orphanage.id}
                                icon = {mapIcon} // informa a imagem que será adicionada ao marker
                                position =  {[ orphanage.latitude, orphanage.longitude ]} // posição do icone
                            >
                    
                            { /* adiciona balão ao clicar no Marker, closeButton false remove o botão de fechar */ }
                            <Popup 
                                closeButton = { false }  // remove o botão de fechar  
                                minWidth = { 240 }  // altura mínima do popup 
                                maxWidth = { 240 }  // altura máxima do popup 
                                className = "map-popup" // classe que permite estilizar pelo css
                            > 
                            {orphanage.name} { /* Texto do Popup */ }
                            <Link to={`/orphanages/${orphanage.id}`} > {/* botão que direciona para um orfanato específico */}
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                                </Popup>
                            </Marker>
                        )
                })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage"> {/* botão que direciona para criação de orfanatos */}
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;