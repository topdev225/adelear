import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@Theme';
import { StoreProvider, AppProviders } from '@Contexts';
import { AppChrome } from '@AppFrame';
import { initHttp } from '@Utils';

initHttp();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StoreProvider>
      <AppProviders>
        <CssBaseline />
        <AppChrome />
      </AppProviders>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('content')
);
