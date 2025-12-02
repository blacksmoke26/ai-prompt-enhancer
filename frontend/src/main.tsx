/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import {Theme} from '@radix-ui/themes';

// components
import {App} from './App';

// types
import '@radix-ui/themes/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <App/>
    </Theme>
  </React.StrictMode>,
);
