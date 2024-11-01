export interface Color {
  id: number;
  label: string;
  rgb: string;
  hex: string | null;
}

export interface Material {
  id: number;
  label: string;
  material_type: string;
  pricepercm3: number;
  description: string;
  colors: Color[];
}

export interface Infill {
  id: number;
  label: string;
  percentage: string;
  multiplier: number;
}

export interface LayerHeight {
  id: number;
  label: string;
  layerHeight: string;
  multiplier: number;
}

export interface Printer {
  id: number;
  label: string;
  technology: string;
  machine_cost_hour: number;
  materials: Material[];
  infills: Infill[];
  layer_heights: LayerHeight[];
}

export interface FinishingService {
  id: number;
  label: string;
  description: string;
  price: number;
}

export interface PrinterData {
  printers: Printer[];
  finishing_services: FinishingService[];
} 