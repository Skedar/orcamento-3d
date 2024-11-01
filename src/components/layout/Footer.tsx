import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="footer--section bg--color-dark">
      <div className="footer--copyright-border"></div>

      <div className="container bg--overlay">
        <div className="row reset--gutter">
          <div className="col-md-3 bg--color-theme bg--overlay">
            <div className="footer--about">
              <div className="logo">
                <img src="/img/footer-logo.png" alt="" />
              </div>

              <div className="content">
                <p>A NMTS é especializada em consultoria e serviços tecnológicos, incluindo reparo de impressoras 3D, impressão 3D, manutenção de computadores e assessoria empresarial. Nossa missão é oferecer soluções eficientes e inovadoras com excelência e qualidade.</p>
              </div>

              <div className="link">
                <Link to="/sobre">Saiba Mais<i className="fa flm fa-angle-double-right"></i></Link>
              </div>

              <div className="info">
                <ul className="nav">
                  <li className="fa-envelope">
                    <a href="mailto:contato@nmts.com.br">contato@nmts.com.br</a>
                  </li>
                  <li className="fa-clock-o">
                    Seg - Sex (09 as 19) <span>(Fechado aos Sab e Dom)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="footer--widgets row">
              {/* Widget 1 */}
              <div className="footer--widget col-md-4">
                <div className="widget--title">
                  <h2 className="h4">Institucional</h2>
                </div>
                <div className="links--widget">
                  <ul className="nav">
                    <li><Link to="/faq"><i className="fa fa-angle-double-right"></i>FAQ</Link></li>
                    <li><Link to="/sobre"><i className="fa fa-angle-double-right"></i>Sobre</Link></li>
                    <li><Link to="/contato"><i className="fa fa-angle-double-right"></i>Contato</Link></li>
                    <li><a href="https://necromantis.com.br/"><i className="fa fa-angle-double-right"></i>Loja Virtual</a></li>
                    <li><Link to="/privacidade"><i className="fa fa-angle-double-right"></i>Política de Privacidade</Link></li>
                  </ul>
                </div>
              </div>

              {/* Widgets 2 e 3 omitidos para brevidade - adicionar conforme necessário */}
            </div>

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