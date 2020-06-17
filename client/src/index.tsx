import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Index/Index';
import { Provider } from 'react-redux'; // redux
import { Router } from 'react-router-dom'; // router
import { createBrowserHistory } from 'history'; // history
import * as serviceWorker from './serviceWorker';

import stroe from './redux/store';

import './index.css';

const customHistory = createBrowserHistory(); // create history

ReactDOM.render(
  <Provider store={stroe}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
