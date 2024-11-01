import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StlViewer from '../components/StlViewer';
import * as THREE from 'three';

interface FormData {
  arquivo: File | null;
  dimensoes: {
    x: number;
    y: number;
    z: number;
  };
  escala: number;
  volume: number;
}

const Orcamento3D: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    arquivo: null,
    dimensoes: { x: 0, y: 0, z: 0 },
    escala: 1,
    volume: 0
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        arquivo: e.target.files![0]
      }));
    }
  };

  const handleModelLoad = (geometry: THREE.BufferGeometry) => {
    const boundingBox = new THREE.Box3().setFromBufferAttribute(
      geometry.getAttribute('position') as THREE.BufferAttribute
    );
    
    const dimensions = new THREE.Vector3();
    boundingBox.getSize(dimensions);
    
    // Atualizar dimensões e calcular volume
    const volume = dimensions.x * dimensions.y * dimensions.z;
    setFormData(prev => ({
      ...prev,
      dimensoes: {
        x: dimensions.x,
        y: dimensions.y,
        z: dimensions.z
      },
      volume: volume
    }));
  };

  const handleDimensionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setFormData(prev => ({
      ...prev,
      dimensoes: {
        ...prev.dimensoes,
        [axis]: value
      }
    }));
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      escala: newScale
    }));
  };

  return (
    <div className="wrapper">
      <Header />
      
      <main className="main--content">
        <div className="container">
          <div className="row">
            {/* Visualizador 3D */}
            <div className="col-md-8">
              <StlViewer 
                stlFile={formData.arquivo} 
                onModelLoad={handleModelLoad}
              />
            </div>

            {/* Formulário */}
            <div className="col-md-4">
              <div className="form-group">
                <label>Arquivo STL</label>
                <input 
                  type="file"
                  onChange={handleFileChange}
                  accept=".stl"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Dimensões (mm)</label>
                <div className="row">
                  <div className="col-xs-4">
                    <input
                      type="number"
                      value={formData.dimensoes.x}
                      onChange={(e) => handleDimensionChange('x', parseFloat(e.target.value))}
                      className="form-control"
                      placeholder="X"
                    />
                  </div>
                  <div className="col-xs-4">
                    <input
                      type="number"
                      value={formData.dimensoes.y}
                      onChange={(e) => handleDimensionChange('y', parseFloat(e.target.value))}
                      className="form-control"
                      placeholder="Y"
                    />
                  </div>
                  <div className="col-xs-4">
                    <input
                      type="number"
                      value={formData.dimensoes.z}
                      onChange={(e) => handleDimensionChange('z', parseFloat(e.target.value))}
                      className="form-control"
                      placeholder="Z"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Escala</label>
                <input
                  type="number"
                  value={formData.escala}
                  onChange={handleScaleChange}
                  className="form-control"
                  step="0.1"
                  min="0.1"
                />
              </div>

              <div className="form-group">
                <label>Volume (cm³)</label>
                <input
                  type="text"
                  value={(formData.volume / 1000).toFixed(2)}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento3D; 