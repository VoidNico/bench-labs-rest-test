import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Header } from './components/Header';
import { Body } from './components/Body';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#188B8B' },
    secondary: { main: '#8D8E8F' },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: { margin: 0 },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Body />
    </ThemeProvider>
  );
}

export default App;
