export interface PrintItem {
  id: number;
  label: string;
  technology: string;
  hourly_rate: number;
  materials: Material[];
}

export interface Material {
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

export interface Color {
  id: number;
  label: string;
  rgb: string;
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

export interface Finishing {
  id: number;
  label: string;
  description: string;
  price: number;
}

export interface PrintOptions {
  printer: number;
  material: number;
  color: number;
  infill: number;
  layerHeight: number;
  finishing: number[];
}

export interface QuoteResponse {
  totalPrice: number;
}