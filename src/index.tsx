import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { reducers } from 'store/store';
import { configureStore } from '@reduxjs/toolkit';
import { App } from './app';

axios.defaults.baseURL = 'http://localhost:5000';

if (window.__NOT_HYDRATE__ === true) {
    const store = configureStore({
        reducer: reducers,
    });
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
} else {
    const store = configureStore({
        reducer: reducers,
        preloadedState: window.__PRELOADED_STATE__ || {},
    });
    delete window.__PRELOADED_STATE__;

    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}
