import { ProductType } from "../../../types/requestHandlers.types";
import { RootState, store } from "../../store";
import { v4 } from "uuid";
import { productDataSelector } from "../productReducer/productReducer";
import {
  calculatePercentage,
  makeDiscount,
} from "../../../utils/product-utils";

export interface InitialState {
  products: ProductType[] | null;
  isLoading: boolean;
}

type ActionType =
  | AddProductActionType
  | DeleteProductActionType
  | AddManyProductsActionType
  | CleanCartActionType;

enum CartActionTitle {
  ADD_PRODUCT = "ADD_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  ADD_MANY_PRODUCTS = "ADD_MANY_PRODUCTS",
  CLEAN_CART = "CLEAN_CART",
}

type AddManyProductsActionType = {
  type: CartActionTitle.ADD_MANY_PRODUCTS;
  payload: ProductType[];
};

type AddProductActionType = {
  type: CartActionTitle.ADD_PRODUCT;
  payload: ProductType;
};

type DeleteProductActionType = {
  type: CartActionTitle.DELETE_PRODUCT;
  payload: { id: string };
};

type CleanCartActionType = {
  type: CartActionTitle.CLEAN_CART;
};

export const addManyProductsAction = (payload: ProductType[]) => {
  return { type: CartActionTitle.ADD_MANY_PRODUCTS, payload };
};

export const addProductAction = (payload: ProductType) => {
  return { type: CartActionTitle.ADD_PRODUCT, payload };
};

export const deleteProductAction = (payload: { id: string }) => {
  return { type: CartActionTitle.DELETE_PRODUCT, payload };
};

export const cleanCartAction = () => {
  return { type: CartActionTitle.CLEAN_CART };
};

const initialState: InitialState = {
  products: [],
  isLoading: true,
};

export const cartReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case CartActionTitle.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: v4() }],
      };
    case CartActionTitle.ADD_MANY_PRODUCTS:
      const newProductsUuid = action.payload.map((product) => ({
        ...product,
        id: v4(),
      }));

      return {
        ...state,
        products: [...state.products, ...newProductsUuid],
      };
    case CartActionTitle.DELETE_PRODUCT:
      const newProducts = [...state.products].filter(
        (el) => el.id !== action.payload.id
      );
      return { ...state, products: newProducts };

    case CartActionTitle.CLEAN_CART:
      return { ...state, products: [] };
    default:
      return state;
  }
};

export const cartProductsSelector = () => store.getState().cart.products;

const total = (state: RootState) => {
  const value = state.cart.products.reduce((acc, product) => {
    const discount = makeDiscount(product.price, product.discountPercentage);
    return acc + discount;
  }, 0);
  return Number(value.toFixed(2));
};
export const totalSelector = () => total(store.getState());

const subTotal = (state: RootState) => {
  const value = state.cart.products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  return Number(value.toFixed(2));
};
export const subTotalSelector = () => subTotal(store.getState());

const discountProcent = (state: RootState) => {
  const totalValue = total(state);
  const subTotalValue = subTotal(state);

  const discountValue = subTotalValue - totalValue;
  if (discountValue === 0) {
    return 0;
  }

  return calculatePercentage(subTotalValue, discountValue).toFixed(2);
};
export const discountProcentSelector = () => discountProcent(store.getState());

const discountPercentage = (state: RootState) => {
  const value = state.cart.products.reduce((acc, product) => {
    return acc + product.discountPercentage;
  }, 0);
  return Number(value.toFixed(0));
};
export const discountPercentageSelector = () =>
  discountPercentage(store.getState());

const discountValue = (state: RootState) => {
  return Number(subTotal(state) - total(state)).toFixed(2);
};
export const discountValueSelector = () => discountValue(store.getState());

export function makeManyProducts(count): ProductType[] {
  const products = [];
  for (let i = 0; i < count; i++) {
    const product = productDataSelector();
    products.push(product);
  }

  return products;
}
