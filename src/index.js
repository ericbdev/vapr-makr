import React from 'react';
import {render} from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

render(<Root />, document.querySelector('[data-app-root]'));
registerServiceWorker();
