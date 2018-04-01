import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as R} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<R><App /></R>, document.getElementById('root'));
registerServiceWorker();
