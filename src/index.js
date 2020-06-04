import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
//For Enabling Caching using Redux-Persist

// import { PersistGate } from 'redux-persist/integration/react';
/*<PersistGate persistor={persistor}>
				<App />
			</PersistGate>*/
import { store, /*persistor*/ } from "./Redux/store";

import './index.css';
import App from './Pages/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<Router>
		    <App />
		</Router>
	</Provider>,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
