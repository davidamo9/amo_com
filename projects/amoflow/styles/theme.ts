export const theme = {
  colors: {
    primary: '#E8D5C4',    // Warm beige
    secondary: '#C9A88099',  // Muted gold
    accent: '#00f0ff',     // Cyan accent
    darkBg: '#000000',
    darkCard: '#0a0a0a',
    darkCardHover: '#111111',
    lightBg: '#050505',
    textDark: '#F5F1ED',   // Warm white
    textLight: '#C9B8A8',  // Beige gray
    textMuted: '#8A7A6A',  // Warm muted
    white: '#ffffff',
    beige: '#E8D5C4',
    beigeLight: '#F5EDE3',
    gradient: 'linear-gradient(135deg, #E8D5C4 0%, #C9A880 100%)',
    gradientAlt: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
    gradientGold: 'linear-gradient(135deg, #E8D5C4 0%, #C9A880 100%)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '5rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px',
  },
  shadows: {
    sm: '0 2px 10px rgba(0, 0, 0, 0.05)',
    md: '0 10px 30px rgba(0, 0, 0, 0.1)',
    lg: '0 15px 40px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 60px rgba(0, 0, 0, 0.2)',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: '0.8125rem',
      sm: '0.9375rem',
      base: '1.0625rem',
      lg: '1.1875rem',
      xl: '1.375rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': '5rem',
      '7xl': '6rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} as const;

export type Theme = typeof theme;
