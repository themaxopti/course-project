import { createStore, combineReducers, applyMiddleware } from "redux";
import { counterReducer } from "./reducers/counterReducer/counterReducer";
import { userReducer } from "./reducers/userReducer/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer/productReducer";
import { orderSummaryReducer } from "./reducers/orderSummaryReducer.ts";
import { cartReducer } from "./reducers/cartReducer/cartReducer.ts";
import { componetsPropertiesReducer } from "./reducers/componentsProperties/componentsProperties.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  product: productReducer,
  orderSummary: orderSummaryReducer,
  cart: persistedCartReducer,
  componetsProperties: componetsPropertiesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

// store.getState
export type RootState = ReturnType<typeof store.getState>;
