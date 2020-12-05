import mapMarkerImg from '../images/map-marker.svg'; // Importar imagem da pasta /images/
import Leaflet from 'leaflet'; // biblioteca nativa

const mapIcon = Leaflet.icon({ // recebe icone e atribui em mapIcon
    iconUrl: mapMarkerImg, // imagem do icone importada acima atribuida na propriedade iconUrl
    iconSize: [58,68], // altera o tamanho do icone
    iconAnchor: [29,68], // altera posicionamento do icone
    popupAnchor: [170, 2], // posicionamento do popup
})

export default mapIcon // exportar para páginas que contem o icone