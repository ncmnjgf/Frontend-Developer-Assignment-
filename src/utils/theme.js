import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7dd3fc',
      light: '#bae6fd',
      dark: '#0284c7',
      contrastText: '#083344',
    },
    secondary: {
      main: '#6366f1',
      contrastText: '#ffffff',
    },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    background: {
      default: '#0b0d14',
      paper: '#181b28',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#3b425e',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#f8fafc' },
    h2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#f8fafc' },
    h3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#f8fafc' },
    h4: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#f8fafc' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.3px' },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.5)',
    '0 1px 3px 0 rgb(0 0 0 / 0.5)',
    '0 4px 6px -1px rgb(0 0 0 / 0.5)',
    '0 10px 15px -3px rgb(0 0 0 / 0.8)',
    '0 20px 25px -5px rgb(0 0 0 / 0.8)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '13px',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: '#a5f3fc',
          color: '#083344',
          '&:hover': { background: '#67e8f9' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#1b1e2a',
            '& fieldset': { borderColor: '#333a4c', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: '#475569' },
            '&.Mui-focused fieldset': { borderColor: '#7dd3fc', borderWidth: '1px' },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#1b1e2a',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333a4c',
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7dd3fc', borderWidth: '1px' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid #333a4c',
          backgroundColor: '#202434',
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6, fontWeight: 600 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, backgroundColor: '#202434', backgroundImage: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: '#202434', border: '1px solid #333a4c' },
      },
    },
  },
});

export default theme;
