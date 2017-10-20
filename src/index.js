import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

import './shared/styles/index.css';

ReactDOM.render(<App />, document.querySelector('[data-app-root]'));
registerServiceWorker();
