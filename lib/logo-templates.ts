import { LogoTemplate, LogoParams } from '@/types/logo-templates';

// Utilitaires pour les formes de base
const createHexagonPath = (size: number): string => {
  const center = size / 2;
  const radius = size * 0.4;
  const points = [];
  
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  
  return `M ${points.join(' L ')} Z`;
};

// Template App Icon moderne
const createAppIconSVG = (params: LogoParams): string => `
  <svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${params.secondaryColor};stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.25"/>
      </filter>
    </defs>
    <g transform="rotate(${params.rotation} ${params.size/2} ${params.size/2})">
      ${params.shape === 'circle' ? `
        <circle 
          cx="${params.size/2}" 
          cy="${params.size/2}" 
          r="${params.size * 0.45}"
          fill="${params.style === 'gradient' ? 'url(#bgGrad)' : params.primaryColor}"
          filter="url(#shadow)"
        />
      ` : params.shape === 'square' ? `
        <rect
          x="${params.size * 0.05}"
          y="${params.size * 0.05}"
          width="${params.size * 0.9}"
          height="${params.size * 0.9}"
          rx="${params.size * 0.2}"
          fill="${params.style === 'gradient' ? 'url(#bgGrad)' : params.primaryColor}"
          filter="url(#shadow)"
        />
      ` : `
        <path
          d="${createHexagonPath(params.size)}"
          fill="${params.style === 'gradient' ? 'url(#bgGrad)' : params.primaryColor}"
          filter="url(#shadow)"
        />
      `}
      ${params.style === 'detailed' ? `
        <circle 
          cx="${params.size * 0.5}" 
          cy="${params.size * 0.5}" 
          r="${params.size * 0.25}"
          fill="${params.accentColor}"
          opacity="0.8"
        />
      ` : ''}
    </g>
  </svg>
`;

// Template Social Media Icon
const createSocialIconSVG = (params: LogoParams): string => `
  <svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${params.secondaryColor};stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g transform="rotate(${params.rotation} ${params.size/2} ${params.size/2})">
      <circle 
        cx="${params.size/2}" 
        cy="${params.size/2}" 
        r="${params.size * 0.45}"
        fill="${params.style === 'gradient' ? 'url(#socialGrad)' : params.primaryColor}"
        filter="url(#glow)"
      />
      ${params.style === 'detailed' ? `
        <path
          d="M ${params.size * 0.3} ${params.size * 0.7} 
             L ${params.size * 0.5} ${params.size * 0.3} 
             L ${params.size * 0.7} ${params.size * 0.7}"
          stroke="${params.accentColor}"
          stroke-width="${params.strokeWidth * 2}"
          fill="none"
          stroke-linecap="round"
        />
      ` : ''}
    </g>
  </svg>
`;

// Template Business Icon
const createBusinessIconSVG = (params: LogoParams): string => `
  <svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="businessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${params.secondaryColor};stop-opacity:1" />
      </linearGradient>
    </defs>
    <g transform="rotate(${params.rotation} ${params.size/2} ${params.size/2})">
      <rect
        x="${params.size * 0.1}"
        y="${params.size * 0.1}"
        width="${params.size * 0.8}"
        height="${params.size * 0.8}"
        rx="${params.size * 0.1}"
        fill="${params.style === 'gradient' ? 'url(#businessGrad)' : params.primaryColor}"
      />
      ${params.style === 'detailed' ? `
        <rect
          x="${params.size * 0.2}"
          y="${params.size * 0.2}"
          width="${params.size * 0.6}"
          height="${params.size * 0.6}"
          rx="${params.size * 0.05}"
          fill="${params.accentColor}"
          opacity="0.8"
        />
      ` : ''}
    </g>
  </svg>
`;

const createGameIconSVG = (params: LogoParams): string => `
  <svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${params.secondaryColor};stop-opacity:1" />
      </linearGradient>
      <filter id="gameGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g transform="rotate(${params.rotation} ${params.size/2} ${params.size/2})">
      ${params.shape === 'circle' ? `
        <circle 
          cx="${params.size/2}" 
          cy="${params.size/2}" 
          r="${params.size * 0.45}"
          fill="${params.style === 'gradient' ? 'url(#gameGrad)' : params.primaryColor}"
          filter="url(#gameGlow)"
        />
      ` : params.shape === 'square' ? `
        <rect
          x="${params.size * 0.05}"
          y="${params.size * 0.05}"
          width="${params.size * 0.9}"
          height="${params.size * 0.9}"
          rx="${params.size * 0.15}"
          fill="${params.style === 'gradient' ? 'url(#gameGrad)' : params.primaryColor}"
          filter="url(#gameGlow)"
        />
      ` : `
        <path
          d="${createHexagonPath(params.size)}"
          fill="${params.style === 'gradient' ? 'url(#gameGrad)' : params.primaryColor}"
          filter="url(#gameGlow)"
        />
      `}
      ${params.style === 'detailed' ? `
        <g transform="translate(${params.size * 0.3}, ${params.size * 0.3}) scale(0.4)">
          <path
            d="M 0 0 L 100 0 L 100 100 L 0 100 Z"
            fill="${params.accentColor}"
            opacity="0.8"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="white"
            opacity="0.6"
          />
        </g>
      ` : ''}
    </g>
  </svg>
`;

export const templates: LogoTemplate[] = [
  {
    id: 'app-icon',
    name: 'App Icon',
    defaultSize: 200,
    createSVG: createAppIconSVG,
    category: 'mobile'
  },
  {
    id: 'social-icon',
    name: 'Social Media',
    defaultSize: 200,
    createSVG: createSocialIconSVG,
    category: 'social'
  },
  {
    id: 'business-icon',
    name: 'Business',
    defaultSize: 200,
    createSVG: createBusinessIconSVG,
    category: 'business'
  },
  {
    id: 'game-icon',
    name: 'Game Icon',
    defaultSize: 200,
    createSVG: createGameIconSVG,
    category: 'gaming'
  }
];

export const categories = [
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'social', name: 'Social Media' },
  { id: 'business', name: 'Business' },
  { id: 'gaming', name: 'Gaming' }
]; 