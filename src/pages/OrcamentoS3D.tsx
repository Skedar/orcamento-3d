import { useState } from 'react';
import printData from '../config/data3dprint.json';
import api from '../services/api';

interface PrintOptions {
  material: string;
  color: string;
  quality: string;
  infill: string;
}

const OrcamentoS3D = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quote, setQuote] = useState<{totalPrice: number} | null>(null);
  const [options, setOptions] = useState<PrintOptions>({
    material: printData.materials[0].id,
    color: printData.colors[0].id,
    quality: printData.qualities[0].id,
    infill: printData.infills[0].id
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    try {
      const response = await api.post('/calculate', formData);
      setQuote(response.data);
    } catch (error) {
      console.error('Erro ao calcular:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Orçamento de Impressão 3D</h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept=".stl" 
          onChange={handleFileChange}
          className="mb-4" 
        />
      </div>

      <div className="grid gap-4">
        <div className="form-group">
          <label className="block mb-2">Material:</label>
          <select 
            value={options.material}
            onChange={(e) => setOptions({...options, material: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {printData.materials.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Cor:</label>
          <select 
            value={options.color}
            onChange={(e) => setOptions({...options, color: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {printData.colors.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Qualidade:</label>
          <select 
            value={options.quality}
            onChange={(e) => setOptions({...options, quality: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {printData.qualities.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.layerHeight}mm)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Preenchimento:</label>
          <select 
            value={options.infill}
            onChange={(e) => setOptions({...options, infill: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {printData.infills.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {quote && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-xl mb-2">Orçamento</h3>
          <p className="text-2xl font-bold">
            R$ {quote.totalPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrcamentoS3D; 