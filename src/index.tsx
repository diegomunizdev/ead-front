import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './assets/global.css'
import './assets/normalize.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));