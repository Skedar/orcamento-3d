import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Orcamento3D from './pages/Orcamento3D';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Orcamento3D />
    </Router>
  );
}

export default App;
