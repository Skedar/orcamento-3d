import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="footer--section bg--color-dark">
      <div className="footer--copyright-border"></div>
      
      <div className="container bg--overlay">
        <div className="row reset--gutter">
          {/* Coluna da Logo */}
          <div className="col-md-3 bg--color-theme bg--overlay">
            <div className="footer--about">
              <div className="logo">
                <img src="/img/footer-logo.png" alt="NMTS Logo" />
              </div>
              
              <div className="content">
                <p>A NMTS é especializada em consultoria e serviços tecnológicos...</p>
              </div>
              
              {/* ... resto do conteúdo */}
            </div>
          </div>

          {/* Widgets */}
          <div className="col-md-9">
            <div className="footer--widgets row">
              {/* ... widgets do footer */}
            </div>

            {/* Copyright */}
            <div className="footer--copyright font--secondary clearfix">
              <p className="float--left">&copy; NMTS Serviços | CNPJ: 38.614.488/0001-10</p>
              <p className="float--right">site desenvolvido por <a href="https://skedar.github.io">Luis "Skedar" Rizzi</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 