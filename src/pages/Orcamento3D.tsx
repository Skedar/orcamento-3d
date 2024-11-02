import { useState } from 'react';
import printData from '../config/data3dprint.json';
import api from '../services/api';

interface Printer {
  id: number;
  label: string;
  technology: string;
  hourly_rate: number;
  materials: Material[];
}

interface Material {
  id: number;
  label: string;
  material_type: string;
  pricepercm3: number;
  description: string;
  colors: Color[];
  infills: Infill[];
  layer_heights: LayerHeight[];
  finishings: Finishing[];
}

interface Color {
  id: number;
  label: string;
  rgb: string;
}

interface Infill {
  id: number;
  label: string;
  percentage: string;
  multiplier: number;
}

interface LayerHeight {
  id: number;
  label: string;
  layerHeight: string;
  multiplier: number;
}

interface Finishing {
  id: number;
  label: string;
  description: string;
  price: number;
}

interface PrintOptions {
  printer: number;
  material: number;
  color: number;
  infill: number;
  layerHeight: number;
  finishing: number[];
}

interface QuoteResponse {
  totalPrice: number;
}

interface ApiResponse {
  totalPrice: number;
}

const Orcamento3D = () => {
  const [quote, setQuote] = useState<{totalPrice: number} | null>(null);
  
  const [selectedPrinter, setSelectedPrinter] = useState<Printer>(printData[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(printData[0].materials[0]);
  
  const [options, setOptions] = useState<PrintOptions>({
    printer: printData[0].id,
    material: printData[0].materials[0].id,
    color: printData[0].materials[0].colors[0].id,
    infill: printData[0].materials[0].infills[0].id,
    layerHeight: printData[0].materials[0].layer_heights[0].id,
    finishing: []
  });

  const handlePrinterChange = (printerId: number) => {
    const printer = printData.find(p => p.id === printerId)!;
    setSelectedPrinter(printer);
    setSelectedMaterial(printer.materials[0]);
    setOptions({
      ...options,
      printer: printerId,
      material: printer.materials[0].id,
      color: printer.materials[0].colors[0].id,
      infill: printer.materials[0].infills[0].id,
      layerHeight: printer.materials[0].layer_heights[0].id,
      finishing: []
    });
  };

  const handleMaterialChange = (materialId: number) => {
    const material = selectedPrinter.materials.find(m => m.id === materialId)!;
    setSelectedMaterial(material);
    setOptions({
      ...options,
      material: materialId,
      color: material.colors[0].id,
      infill: material.infills[0].id,
      layerHeight: material.layer_heights[0].id,
      finishing: []
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    try {
      const response = await api.post<ApiResponse>('/calculate', formData);
      setQuote(response.data);
    } catch (error) {
      console.error('Erro ao calcular:', error);
    }
  };

  const toggleFinishing = (finishingId: number) => {
    setOptions(prev => ({
      ...prev,
      finishing: prev.finishing.includes(finishingId)
        ? prev.finishing.filter(id => id !== finishingId)
        : [...prev.finishing, finishingId]
    }));
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
          <label className="block mb-2">Impressora:</label>
          <select 
            value={options.printer}
            onChange={(e) => handlePrinterChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {printData.map(printer => (
              <option key={printer.id} value={printer.id}>
                {printer.label} - {printer.technology}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Material:</label>
          <select 
            value={options.material}
            onChange={(e) => handleMaterialChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            {selectedPrinter.materials.map(material => (
              <option key={material.id} value={material.id}>
                {material.label} - {material.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Cor:</label>
          <select 
            value={options.color}
            onChange={(e) => setOptions({...options, color: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            {selectedMaterial.colors.map(color => (
              <option key={color.id} value={color.id}>
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Preenchimento:</label>
          <select 
            value={options.infill}
            onChange={(e) => setOptions({...options, infill: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            {selectedMaterial.infills.map(infill => (
              <option key={infill.id} value={infill.id}>
                {infill.label} ({infill.percentage})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Altura da Camada:</label>
          <select 
            value={options.layerHeight}
            onChange={(e) => setOptions({...options, layerHeight: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            {selectedMaterial.layer_heights.map(height => (
              <option key={height.id} value={height.id}>
                {height.label} ({height.layerHeight})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="block mb-2">Acabamentos:</label>
          <div className="grid gap-2">
            {selectedMaterial.finishings.map(finishing => (
              <label key={finishing.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.finishing.includes(finishing.id)}
                  onChange={() => toggleFinishing(finishing.id)}
                  className="mr-2"
                />
                {finishing.label} - {finishing.description} (R$ {finishing.price.toFixed(2)})
              </label>
            ))}
          </div>
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

export default Orcamento3D;