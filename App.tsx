import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import retrieveStore from './src/redux/store/Store';
import Dashboard from './src/screens/Dashboard';


const { store, persistor } = retrieveStore();

/**
 * App(): Root App file
 * @returns 
 * @author VIVEK PS
 */
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Dashboard />
      </PersistGate>
    </Provider>
  );
}

export default App;
