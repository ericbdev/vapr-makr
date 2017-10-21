import React from 'react';
import {render} from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

import './assets/styles/index.css';

render(<App />, document.querySelector('[data-app-root]'));
registerServiceWorker();
