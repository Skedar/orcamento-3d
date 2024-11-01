import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header--section">
      {/* Header Topbar */}
      <div className="header--topbar bg--color-dark">
        <div className="container">
          <ul className="nav links float--left hidden-xxs">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/suporte">Suporte</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          
          <ul className="nav social float--right">
            <li><a href="https://web.facebook.com/nmts.servicos"><i className="fa fa-facebook"></i></a></li>
            <li><a href="https://bsky.app/profile/nmts.bsky.social"><i className="fa-brands fa-bluesky"></i></a></li>
            <li><a href="https://www.linkedin.com/company/nmts3dti"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="https://mastodon.social/@nmts"><i className="fa-brands fa-mastodon"></i></a></li>
          </ul>
        </div>
      </div>

      {/* Header Navbar Top */}
      <div className="header--navbar-top">
        <div className="container">
          <div className="logo float--left">
            <div className="vc--parent">
              <div className="vc--child">
                <Link to="/"><img src="/img/logo.png" alt="NMTS Logo" /></Link>
              </div>
            </div>
          </div>

          <div className="float--right">
            <div className="header--navbar-top-info float--left">
              <div className="vc--parent">
                <div className="vc--child">
                  <ul className="nav">
                    <li>
                      <div className="icon text--primary">
                        <i className="fa fa-clock-o"></i>
                      </div>
                      <div className="content">
                        <p>Seg - Sex (09 as 19)</p>
                        <p className="text--primary">(Fechado aos Sab e Dom)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="header--navbar-top-btn float--left">
              <div className="vc--parent">
                <div className="vc--child">
                  <Link to="/#reuniao" className="btn btn-default">Agende uma Reunião</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navbar */}
      <nav className="header--navbar navbar" data-trigger="sticky">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#headerNav">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div id="headerNav" className="navbar-collapse collapse float--left">
            <ul className="header--nav-links nav navbar-nav font--secondary">
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/#solucoes">Soluções</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><a href="https://necromantis.com.br">Loja</a></li>
              <li><Link to="/#portfolio">Portfolio</Link></li>
              <li><Link to="/#info">Informações</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;