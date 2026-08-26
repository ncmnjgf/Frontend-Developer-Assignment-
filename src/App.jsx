import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { store } from '@/app/store';
import theme from '@/utils/theme';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={3500}
          >
            <AppRoutes />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
