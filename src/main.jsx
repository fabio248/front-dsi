import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { configApiBackend } from './config';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 5 * 6 } },
});
const supabase = createClient(
  `${configApiBackend.supabaseUrl}`,
  `${configApiBackend.supabaseKey}`
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#573874',
    },
    secondary: {
      main: '#8EC167',
    },
    inherit: {
      main: '#8EC167',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionContextProvider>
  </ThemeProvider>
);
