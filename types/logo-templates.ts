export type LogoStyle = 'minimal' | 'detailed' | 'gradient';
export type LogoShape = 'circle' | 'square' | 'hexagon';
export type LogoCategory = 'mobile' | 'social' | 'business';

export interface LogoTemplate {
  id: string;
  name: string;
  defaultSize: number;
  createSVG: (params: LogoParams) => string;
  category: LogoCategory;
}

export interface LogoParams {
  size: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  strokeWidth: number;
  rotation: number;
  shape: LogoShape;
  style: LogoStyle;
}

export interface Category {
  id: LogoCategory;
  name: string;
} 