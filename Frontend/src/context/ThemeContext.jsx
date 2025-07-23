// contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext({});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Definitions
export const themes = {
  neonCyberpunk: {
    id: 'neonCyberpunk',
    name: 'Neon Cyberpunk',
    description: 'Futuristic tech vibes with glowing neon accents',
    colors: {
      primary: '#00D9FF',
      secondary: '#FF006E',
      accent: '#FFBE0B',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
        accent: '#00D9FF'
      },
      border: '#2A2A2A',
      gradient: {
        primary: 'linear-gradient(135deg, #00D9FF 0%, #FF006E 100%)',
        secondary: 'linear-gradient(135deg, #FF006E 0%, #FFBE0B 100%)',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1A0A1A 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Orbitron', monospace",
        body: "'Share Tech Mono', monospace",
        accent: "'Audiowide', cursive"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      }
    },
    effects: {
      glow: true,
      particles: true,
      glitch: true,
      scanlines: true
    },
    animations: {
      speed: 'fast',
      type: 'energetic'
    }
  },

  minimalistZen: {
    id: 'minimalistZen',
    name: 'Minimalist Zen',
    description: 'Clean, peaceful design with focus on content',
    colors: {
      primary: '#2D3436',
      secondary: '#636E72',
      accent: '#74B9FF',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#2D3436',
        secondary: '#636E72',
        accent: '#74B9FF'
      },
      border: '#E9ECEF',
      gradient: {
        primary: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
        secondary: 'linear-gradient(135deg, #74B9FF 0%, #A8D8FF 100%)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Playfair Display', serif",
        body: "'Inter', sans-serif",
        accent: "'Caveat', cursive"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3.5rem'
      }
    },
    effects: {
      glow: false,
      particles: false,
      glitch: false,
      scanlines: false
    },
    animations: {
      speed: 'slow',
      type: 'subtle'
    }
  },

  retroWave: {
    id: 'retroWave',
    name: 'Retro Wave',
    description: '80s inspired synthwave aesthetics',
    colors: {
      primary: '#FF6B9D',
      secondary: '#C44569',
      accent: '#FFC93C',
      background: '#1A0033',
      surface: '#2A1A4A',
      text: {
        primary: '#FFFFFF',
        secondary: '#E0B0FF',
        accent: '#FFC93C'
      },
      border: '#3A2A5A',
      gradient: {
        primary: 'linear-gradient(135deg, #FF6B9D 0%, #FFC93C 100%)',
        secondary: 'linear-gradient(135deg, #C44569 0%, #FF6B9D 100%)',
        background: 'linear-gradient(180deg, #1A0033 0%, #2A1A4A 50%, #4A2A6A 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Righteous', cursive",
        body: "'Exo 2', sans-serif",
        accent: "'Kalam', cursive"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
        '5xl': '4rem'
      }
    },
    effects: {
      glow: true,
      particles: true,
      glitch: false,
      scanlines: true
    },
    animations: {
      speed: 'medium',
      type: 'retro'
    }
  },

  darkGlassmorphism: {
    id: 'darkGlassmorphism',
    name: 'Dark Glassmorphism',
    description: 'Modern frosted glass effects with depth',
    colors: {
      primary: '#667EEA',
      secondary: '#764BA2',
      accent: '#F093FB',
      background: '#0F0F0F',
      surface: 'rgba(255, 255, 255, 0.05)',
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
        accent: '#F093FB'
      },
      border: 'rgba(255, 255, 255, 0.1)',
      gradient: {
        primary: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        secondary: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
        background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)'
      },
      glass: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Poppins', sans-serif",
        body: "'Inter', sans-serif",
        accent: "'Space Grotesk', sans-serif"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.75rem',
        '5xl': '3.5rem'
      }
    },
    effects: {
      glow: true,
      particles: true,
      glitch: false,
      scanlines: false,
      blur: true
    },
    animations: {
      speed: 'medium',
      type: 'smooth'
    }
  },

  techBrutalist: {
    id: 'techBrutalist',
    name: 'Tech Brutalist',
    description: 'Raw, industrial design with sharp edges',
    colors: {
      primary: '#000000',
      secondary: '#FF0000',
      accent: '#FFFF00',
      background: '#F0F0F0',
      surface: '#FFFFFF',
      text: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#FF0000'
      },
      border: '#000000',
      gradient: {
        primary: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
        secondary: 'linear-gradient(135deg, #FF0000 0%, #FFFF00 100%)',
        background: 'linear-gradient(180deg, #F0F0F0 0%, #FFFFFF 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Space Mono', monospace",
        body: "'IBM Plex Mono', monospace",
        accent: "'VT323', monospace"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
        '5xl': '4.5rem'
      }
    },
    effects: {
      glow: false,
      particles: false,
      glitch: true,
      scanlines: false,
      noise: true
    },
    animations: {
      speed: 'instant',
      type: 'brutal'
    }
  },

  artisticGallery: {
    id: 'artisticGallery',
    name: 'Artistic Gallery',
    description: 'Elegant showcase for visual creators',
    colors: {
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
      accent: '#D4AF37',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: {
        primary: '#1A1A1A',
        secondary: '#6A6A6A',
        accent: '#D4AF37'
      },
      border: '#E0E0E0',
      gradient: {
        primary: 'linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 100%)',
        secondary: 'linear-gradient(135deg, #D4AF37 0%, #F4E04D 100%)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Bodoni Moda', serif",
        body: "'Crimson Text', serif",
        accent: "'Amatic SC', cursive"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
        '5xl': '5rem'
      }
    },
    effects: {
      glow: false,
      particles: false,
      glitch: false,
      scanlines: false,
      gallery: true
    },
    animations: {
      speed: 'elegant',
      type: 'fade'
    }
  },

  professionalCorporate: {
    id: 'professionalCorporate',
    name: 'Professional Corporate',
    description: 'Clean, trustworthy design for business professionals',
    colors: {
      primary: '#1E3A8A',
      secondary: '#3B82F6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F3F4F6',
      text: {
        primary: '#111827',
        secondary: '#6B7280',
        accent: '#1E3A8A'
      },
      border: '#E5E7EB',
      gradient: {
        primary: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        secondary: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)'
      }
    },
    typography: {
      fontFamily: {
        heading: "'Merriweather', serif",
        body: "'Open Sans', sans-serif",
        accent: "'Montserrat', sans-serif"
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem'
      }
    },
    effects: {
      glow: false,
      particles: false,
      glitch: false,
      scanlines: false
    },
    animations: {
      speed: 'professional',
      type: 'smooth'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('minimalistZen');
  const [customSettings, setCustomSettings] = useState({});

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolioTheme');
    const savedSettings = localStorage.getItem('portfolioThemeSettings');
    
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedSettings) {
      setCustomSettings(JSON.parse(savedSettings));
    }

    // Apply theme to document
    applyTheme(savedTheme || 'darkGlassmorphism');
  }, []);

  const applyTheme = (themeId) => {
    const theme = themes[themeId];
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // Apply font families
    Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Add theme class to body
    document.body.className = `theme-${themeId}`;
  };

  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('portfolioTheme', themeId);
      applyTheme(themeId);
    }
  };

  const updateCustomSettings = (settings) => {
    setCustomSettings(settings);
    localStorage.setItem('portfolioThemeSettings', JSON.stringify(settings));
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
    customSettings,
    updateCustomSettings
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};