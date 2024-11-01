import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header--section">
      {/* Topbar */}
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

      {/* Navbar Top */}
      <div className="header--navbar-top">
        <div className="container">
          <div className="logo float--left">
            <div className="vc--parent">
              <div className="vc--child">
                <Link to="/">
                  <img src="/img/logo.png" alt="NMTS Logo" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* ... resto do navbar top */}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="header--navbar navbar" data-trigger="sticky">
        {/* ... navegação principal */}
      </nav>
    </header>
  );
};

export default Header; 