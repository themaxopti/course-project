import { createStore, combineReducers, applyMiddleware } from "redux";
import { counterReducer } from "./reducers/counterReducer/counterReducer";
import { userReducer } from "./reducers/userReducer/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer/productReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  product: productReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
