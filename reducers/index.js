import { combineReducers } from 'redux';
import OrderReducer from './orderReducer';
import ProductReducer from './productReducer';
import TaskReducer from './taskReducer';
import MainReducer from './mainReducer';
import GarmentPrinterReducer from './garmentPrintersReducer';
import UserReducer from './userReducer';
import BinReducer from './binReducer';
import ToteReducer from './toteReducer';
import ActionReducer from './actionReducer';
import { reducer as form } from 'redux-form'
export default combineReducers({
    OrderReducer,
    ProductReducer,
    TaskReducer,
    MainReducer,
    BinReducer, 
    UserReducer,
    GarmentPrinterReducer,
    ToteReducer,
    ActionReducer,
    form
});