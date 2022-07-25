import React from 'react';
import ReactDOM from 'react-dom/client';
import MainFunc from './common';
import {SessionProvider} from './library';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionProvider>
    <MainFunc />
  </SessionProvider>
);
