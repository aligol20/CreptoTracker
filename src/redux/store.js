import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root';
import {createStore, applyMiddleware} from 'redux';

const persistConfig = {
  key: '1',
  version: 1,
  storage: AsyncStorage,
  debug: true,
  whitelist: ['crypto'],
  blacklist: [],
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composedEnhancer);

export let persistor = persistStore(store);
