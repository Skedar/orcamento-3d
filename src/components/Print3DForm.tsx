import React, { useState } from 'react';
import StlViewer from './StlViewer';

const Print3DForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [printerOptions, setPrinterOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setLoading(true);

      // Enviar para o Lambda
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      try {
        const response = await fetch('sua-url-do-lambda', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        // O Lambda retorna as dimensões, volume e preço base
        setQuote(data);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOptionsChange = async (options: any) => {
    if (!file) return;

    setLoading(true);
    try {
      // Enviar opções selecionadas para recalcular
      const response = await fetch('sua-url-do-lambda/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileId: quote.fileId, // ID temporário do arquivo no Lambda
          options
        })
      });

      const newQuote = await response.json();
      setQuote(newQuote);
    } catch (error) {
      console.error('Erro ao recalcular:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="print-3d-form">
      <div className="upload-section">
        <input 
          type="file" 
          accept=".stl"
          onChange={handleFileUpload}
        />
      </div>

      {file && (
        <div className="preview-section">
          <StlViewer file={file} />
        </div>
      )}

      {loading && <div>Calculando...</div>}

      {quote && (
        <div className="quote-section">
          <h3>Detalhes do Orçamento</h3>
          <p>Volume: {quote.volume} cm³</p>
          <p>Dimensões: {quote.dimensions.x}x{quote.dimensions.y}x{quote.dimensions.z} mm</p>
          <p>Preço Base: R$ {quote.basePrice}</p>
          
          {/* Opções de impressão populadas do data3dprint.json */}
          {/* Ao mudar, chama handleOptionsChange */}
        </div>
      )}
    </div>
  );
};

export default Print3DForm; 