import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer/userReducer";
import { productReducer } from "./reducers/productReducer/productReducer";
import { orderSummaryReducer } from "./reducers/orderSummaryReducer.ts";
import { cartReducer } from "./reducers/cartReducer/cartReducer.ts";
import { componentsPropertiesReducer } from "./reducers/componentsProperties/componentsProperties.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  orderSummary: orderSummaryReducer,
  cart: persistedCartReducer,
  componetsProperties: componentsPropertiesReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
