import { createStore, combineReducers } from 'redux';
import {counterReducer} from './reducers/counterReducer/counterReducer';
import {userReducer} from './reducers/userReducer/userReducer';
import { orderSummaryReducer } from "./reducers/orderSummaryReducer.ts";

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    orderSummary: orderSummaryReducer,
});

export const store = createStore(rootReducer);
