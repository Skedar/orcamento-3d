declare module '../config/data3dprint.json' {
  interface PrintItem {
    id: string;
    name: string;
    price: number;
  }

  interface Material extends PrintItem {
    description: string;
  }

  interface Quality extends PrintItem {
    layerHeight: number;
  }

  interface Infill extends PrintItem {
    percentage: number;
  }

  interface PrintData {
    materials: Material[];
    colors: PrintItem[];
    qualities: Quality[];
    infills: Infill[];
  }

  const value: PrintData;
  export default value;
} 