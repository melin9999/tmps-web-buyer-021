'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#047857',
    },
    secondary: {
      main: '#fde047',
    },
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}