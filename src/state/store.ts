// src/store/store.js
import { createStore, combineReducers } from 'redux';
import {counterReducer} from './reducers/counterReducer/counterReducer';
import {userReducer} from './reducers/userReducer/userReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

export const store = createStore(rootReducer);
