import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
//For Enabling Caching using Redux-Persist

// import { persistStore } from 'redux-persist'; 
// const persistor = persistStore(store);

import RootReducer from './rootReducer.js';

const middlewares = [logger];

const store = createStore(RootReducer, applyMiddleware(...middlewares))


export  { store, /*persistor*/ }