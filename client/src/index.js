import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducer' // ./_reducer라고만 쳐도 알아서 리듀서를 찾아줌

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) 
// promise, thunk  - dispatch한테 function, Promise가 들어왔을 때 어떻게 대처해야 하는지 알려주는 역할.

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
