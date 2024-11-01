import { useState } from 'react';
import printData from '../config/data3dprint.json';
import api from '../services/api';
import { Material, PrintItem, Quality, Infill } from '../types';

interface PrintOptions {
  material: string;
  color: string;
  quality: string;
  infill: string;
}

interface Quote {
  totalPrice: number;
}

const Print3DForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [options, setOptions] = useState<PrintOptions>({
    material: printData.materials[0].id,
    color: printData.colors[0].id,
    quality: printData.qualities[0].id,
    infill: printData.infills[0].id
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await api.post('/calculate', formData);
        setQuote(response.data);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".stl" onChange={handleFileChange} />

      <div>
        <label>Material:</label>
        <select 
          value={options.material}
          onChange={(e) => setOptions({...options, material: e.target.value})}
        >
          {(printData.materials as Material[]).map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </select>

        <label>Cor:</label>
        <select 
          value={options.color}
          onChange={(e) => setOptions({...options, color: e.target.value})}
        >
          {(printData.colors as PrintItem[]).map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        <label>Qualidade:</label>
        <select 
          value={options.quality}
          onChange={(e) => setOptions({...options, quality: e.target.value})}
        >
          {(printData.qualities as Quality[]).map((quality) => (
            <option key={quality.id} value={quality.id}>
              {quality.name}
            </option>
          ))}
        </select>

        <label>Preenchimento:</label>
        <select 
          value={options.infill}
          onChange={(e) => setOptions({...options, infill: e.target.value})}
        >
          {(printData.infills as Infill[]).map((infill) => (
            <option key={infill.id} value={infill.id}>
              {infill.name}
            </option>
          ))}
        </select>
      </div>

      {quote && (
        <div>
          <h3>Orçamento</h3>
          <p>R$ {quote.totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Print3DForm;