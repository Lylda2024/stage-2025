export interface MapMarker {
  position: {
    lat: number;
    lng: number;
  };
  label?: string;
  title: string;
  options?: {
    iconUrl?: string;
    iconSize?: [number, number];
    [key: string]: any;
  };
  data?: any; // Pour attacher des données supplémentaires
}

export interface MapBounds {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
}

export interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: MapBounds;
}
