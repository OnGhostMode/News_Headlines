import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/Index';
import rootSaga from '../saga/Saga';

/**
 * persistConfig: Configurations for redux-persist
 * @param key: Key for the redux-persist
 * @param storage: Storage used for the redux-persist
 * @param whitelist: Redux state values that has to be saved to device storage
 * @author VIVEK PS
 */
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'MainReducer',
    ],
    blacklist: [],
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]
const reducer = persistReducer(persistConfig, reducers);

/**
 * retrieveStore(): connects redux saga store
 */
export default function retrieveStore() {
    const store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middleware),
      })

    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga, store.dispatch);
    return { persistor, store };
}
