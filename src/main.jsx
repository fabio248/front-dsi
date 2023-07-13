import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';

const supabase = createClient(
  'https://uaxoyjmbhrugldbyjywi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVheG95am1iaHJ1Z2xkYnlqeXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzMzYzMjksImV4cCI6MTk5OTkxMjMyOX0.CLgs1gf3_KHr8GiDfGYsgQdSyagKXkkaVdylOpiKoZI'
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
      <App />
    </SessionContextProvider>
  </ThemeProvider>
);
