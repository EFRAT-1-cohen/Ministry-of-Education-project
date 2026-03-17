import { createTheme } from '@mui/material/styles';

const childTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6B9D', // ורוד חם
      light: '#FF85B1',
      dark: '#E84C7A',
    },
    secondary: {
      main: '#4ECDC4', // טורקיז
      light: '#6FE3DB',
      dark: '#2EB8AE',
    },
    success: {
      main: '#A8E63D', // ירוק בהיר
      light: '#BFEC5F',
      dark: '#8BC924',
    },
    warning: {
      main: '#FFD93D', // צהוב זהוב
      light: '#FFE352',
      dark: '#FFC300',
    },
    error: {
      main: '#FF6B6B', // אדום קל
      light: '#FF8585',
      dark: '#E84C4C',
    },
    info: {
      main: '#6BCF7F', // ירוק בהיר
    },
    background: {
      default: '#FFF9E6', // רקע קרם בהיר
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
  },
  typography: {
    fontFamily: '"Fredoka One", "Comic Sans MS", "Trebuchet MS", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      fontWeight: 700,
      fontSize: '1rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '12px 28px',
          fontSize: '1.1rem',
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          },
          '&:active': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF6B9D 0%, #E84C7A 100%)',
          color: '#FFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF85B1 0%, #FF6B9D 100%)',
          },
        },
        outlined: {
          borderWidth: '3px',
          '&:hover': {
            borderWidth: '3px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            fontSize: '1rem',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          height: '12px',
          backgroundColor: '#F0F0F0',
        },
        bar: {
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #4ECDC4 0%, #A8E63D 100%)',
        },
      },
    },
  },
});

export default childTheme;
