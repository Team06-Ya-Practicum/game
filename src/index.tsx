/* eslint no-underscore-dangle: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { App } from './app';

declare const window: any;

if (typeof process !== 'undefined') {
    axios.defaults.baseURL = `http://localhost:${process.env.PORT || 5000}`;
} else {
    axios.defaults.baseURL = 'http://localhost:5000';
}

if (window.__NOT_HYDRATE__ === true) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'),
    );
} else {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'),
    );
}
