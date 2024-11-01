import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { loadScripts } from '../utils/scriptLoader';

const Orcamento3D: React.FC = () => {
  useEffect(() => {
    loadScripts();
  }, []);

  return (
    <div className="wrapper">
      <div className="preloader bg--color-theme"></div>
      <Header />
      <div className="page-header--section text-center">
        <div className="page--title pd--130-0" data-bg-img="/img/page-header-img.jpg">
          <div className="container">
            <h1 className="h1">Impressão 3D Sob Demanda</h1>
          </div>
        </div>
        <div className="page--breadcrumb font--secondary">
          <div className="container">
            <ul className="breadcrumb">
              <li><a href="/">NMTS</a></li>
              <li className="active"><span>Impressão 3D Sob Demanda</span></li>
            </ul>
          </div>
        </div>
      </div>
      <main className="main-content">
        {/* Conteúdo principal será adicionado aqui */}
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento3D; 