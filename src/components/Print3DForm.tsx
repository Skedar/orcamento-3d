import { useState } from 'react';
import printData from '../config/data3dprint.json';
import api from '../services/api';

const Print3DForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quote, setQuote] = useState<any>(null);
  const [options, setOptions] = useState({
    material: printData.materials[0].id,
    color: printData.colors[0].id,
    quality: printData.qualities[0].id,
    infill: printData.infills[0].id
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
          {printData.materials.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <label>Cor:</label>
        <select 
          value={options.color}
          onChange={(e) => setOptions({...options, color: e.target.value})}
        >
          {printData.colors.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label>Qualidade:</label>
        <select 
          value={options.quality}
          onChange={(e) => setOptions({...options, quality: e.target.value})}
        >
          {printData.qualities.map(q => (
            <option key={q.id} value={q.id}>{q.name}</option>
          ))}
        </select>

        <label>Preenchimento:</label>
        <select 
          value={options.infill}
          onChange={(e) => setOptions({...options, infill: e.target.value})}
        >
          {printData.infills.map(i => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      {quote && (
        <div>
          <h3>Orçamento</h3>
          <p>R$ {quote.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default Print3DForm; 