import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './features/store';
import persistStore from "redux-persist/es/persistStore"
import {PersistGate} from "redux-persist/lib/integration/react"
import { Provider } from 'react-redux';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { AppContextProvider } from './context';

const persistedStore=persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <Provider store={store}>
          <PersistGate persistor={persistedStore} loading={null}>
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          </PersistGate>
        </Provider>
      </AppContextProvider>
    </Router>
  </React.StrictMode>
);


