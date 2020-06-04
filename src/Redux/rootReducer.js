
import { combineReducers } from "redux";

import { tubeReducer } from './tube/tube-reducer.js';
//For Enabling Caching using Redux-Persist

// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	whitelist: [''],
// }
// export default persistReducer(persistConfig, rootReducer);

const rootReducer = combineReducers({
	tube: tubeReducer
})

export default rootReducer