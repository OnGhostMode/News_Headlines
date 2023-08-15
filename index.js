import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { name as appName } from './app.json';
import retrieveStore from './src/redux/store/Store';

const { store, persistor } = retrieveStore();

/**
 * ReduxProvider(): Wrap around for redux
 * @returns 
 * @author VIVEK PS
 */
const ReduxProvider = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => ReduxProvider);
