export interface ColorPreset {
  id: string;
  name: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const colorPresets: ColorPreset[] = [
  // Presets pour applications mobiles
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    category: 'mobile',
    colors: {
      primary: '#1E40AF',
      secondary: '#3B82F6',
      accent: '#60A5FA'
    }
  },
  {
    id: 'vibrant-purple',
    name: 'Vibrant Purple',
    category: 'mobile',
    colors: {
      primary: '#6D28D9',
      secondary: '#8B5CF6',
      accent: '#A78BFA'
    }
  },
  // Presets pour réseaux sociaux
  {
    id: 'social-gradient',
    name: 'Social Gradient',
    category: 'social',
    colors: {
      primary: '#D946EF',
      secondary: '#EC4899',
      accent: '#F472B6'
    }
  },
  // Presets pour business
  {
    id: 'corporate',
    name: 'Corporate',
    category: 'business',
    colors: {
      primary: '#1E293B',
      secondary: '#334155',
      accent: '#475569'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    category: 'business',
    colors: {
      primary: '#0F766E',
      secondary: '#0D9488',
      accent: '#14B8A6'
    }
  },
  {
    id: 'gaming-neon',
    name: 'Neon Gaming',
    category: 'gaming',
    colors: {
      primary: '#2D00F7',
      secondary: '#F20089',
      accent: '#00FF00'
    }
  },
  {
    id: 'gaming-retro',
    name: 'Retro Gaming',
    category: 'gaming',
    colors: {
      primary: '#6B0F1A',
      secondary: '#B91372',
      accent: '#F1B814'
    }
  }
];

export const categories = [
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'social', name: 'Social Media' },
  { id: 'business', name: 'Business' },
  { id: 'gaming', name: 'Gaming' }
]; 