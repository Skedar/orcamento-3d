// Tipos globais da aplicação
export interface CommonProps {
  children?: React.ReactNode;
}

// Outros tipos serão adicionados conforme necessário 

export interface PrintItem {
  id: string;
  name: string;
  price: number;
}

export interface Material extends PrintItem {
  description: string;
}

export interface Quality extends PrintItem {
  layerHeight: number;
}

export interface Infill extends PrintItem {
  percentage: number;
}

export interface PrintData {
  materials: Material[];
  colors: PrintItem[];
  qualities: Quality[];
  infills: Infill[];
} 