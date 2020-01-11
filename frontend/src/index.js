import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  { BrowserRouter as Router } from 'react-router-dom';
import reducer from './reducers/reducer'


const store = createStore(
    //place reducers here
    reducer, 
    (applyMiddleware(thunk, logger))
)

ReactDOM.render(
    <Router>
    <Provider store = {store} >
    <App />
    </Provider>
    </Router>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();