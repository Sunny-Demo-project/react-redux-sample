import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import createInterceptors from './axiosInterceptor';

const sagaMiddleware = createSagaMiddleware()
const storeEnhancer = applyMiddleware(promise, sagaMiddleware, thunk)(createStore)
const appStore = storeEnhancer(rootReducer);
createInterceptors(appStore);
export default appStore;
