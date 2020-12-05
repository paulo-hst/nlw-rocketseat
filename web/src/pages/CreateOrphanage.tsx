import React, { ChangeEvent } from "react";
import { useState, FormEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet' ;
import Sidebar from '../components/Sidebar'
import { FiPlus } from "react-icons/fi";
import mapIcon from '../utils/mapIcon';
import '../styles/pages/create-orphanage.css';
import api from "../services/api";
import { useHistory } from "react-router-dom";


export default function CreateOrphanage() {
  const history = useHistory(); 

  // Estados
  const [position, setPosition] = useState({ latitude: 0, longitude: 0  }); // lat/long > valor inicial
  const [name, setName] = useState(''); // ('') > valor inicial
  const [about, setAbout] = useState(''); // ('') > valor inicial
  const [instructions, setInstructions] = useState(''); // ('') > valor inicial
  const [opening_hours, setOpeningHours] = useState(''); // ('') > valor inicial
  const [open_on_weekends, setOpenOnWeekends] = useState(true); // true por padrão
  const [images, setImages] = useState<File[]>([  ]);
  const [previewImages, setPreviewImages] = useState<string[]>([  ]);
  
  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng; // Desestruturação
    
    setPosition({
      latitude: lat, 
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault(); // evita carregamento da página ao enviar o formulário

    const{ latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('position', String(position));
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso');

    history.push('/app'); // Redireciona o usuário após o post 

  }

  return (
    <div id="page-create-orphanage"> 
      
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form" >
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[ -22.8744843, -43.3004858 ]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {/* If ternário sem else utiliza-se && */}
              { position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[ 
                    position.latitude, 
                    position.longitude
                  ]}
                /> 
              )}
              {/*<Marker interactive={false} icon={mapIcon} position={[ -22.8744843, -43.3004858 ]} />*/}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              /> 
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img src={image} alt={name} key={image}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image"> {/* Remove Submit por padrão do button */}
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"  
                value={instructions} 
                onChange={event => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick = {() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                 type="button"
                 className={!open_on_weekends ? 'active' : ''}
                 onClick = {() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
