import React from 'react';
import { Link } from 'react-router-dom' // Permite a Single Page Application. Troca Link pela tag <a>
import { FiArrowRight } from 'react-icons/fi'

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';

function Landing(){
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>

                    <div className="location">
                        <strong>Rio de Janeiro</strong>
                        <span>Rio de Janeiro</span>
                    </div>

                    <Link to="/app" className="enter-app"> 
                        <FiArrowRight size={26} color="rgba(0, 0, 0, 0,6)" />
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Landing;