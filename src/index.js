import React from 'react';
import {render} from 'react-dom';
import Root from './app/Root';
import registerServiceWorker from './registerServiceWorker';

import './assets/styles/index.css';

render(<Root />, document.querySelector('[data-app-root]'));
registerServiceWorker();
