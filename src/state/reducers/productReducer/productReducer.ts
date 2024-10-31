import { ProductType } from "../../../types/requestHandlers.types";
import { requestHandlers } from "../../../utils/requestHandlers";
import { RootState, store } from "../../store";

export interface InitialState {
  data: ProductType | null;
  isLoading: boolean;
  isProductExist: boolean;
}

type ActionType =
  | SetProductActionType
  | SetProductLoadingActionType
  | SetIsProductExist;

enum ProductActionTitle {
  SET_PRODUCT = "SET_PRODUCT",
  SET_PRODUCT_LOADING = "SET_PRODUCT_LOADING",
  SET_IS_PRODUCT_EXIST = "SET_IS_PRODUCT_EXIST",
}

type SetProductActionType = {
  type: ProductActionTitle.SET_PRODUCT;
  payload: ProductType;
};

type SetProductLoadingActionType = {
  type: ProductActionTitle.SET_PRODUCT_LOADING;
  payload: boolean;
};

type SetIsProductExist = {
  type: ProductActionTitle.SET_IS_PRODUCT_EXIST;
  payload: boolean;
};

export const setProductAction = (payload: ProductType) => {
  return { type: ProductActionTitle.SET_PRODUCT, payload };
};

export const setProductLoadingAction = (payload: boolean) => {
  return { type: ProductActionTitle.SET_PRODUCT_LOADING, payload };
};

export const setIsProductExist = (payload: boolean) => {
  return { type: ProductActionTitle.SET_IS_PRODUCT_EXIST, payload };
};

const initialState: InitialState = {
  data: null,
  isLoading: true,
  isProductExist: true,
};

export const productReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case ProductActionTitle.SET_PRODUCT:
      return { ...state, data: action.payload };
    case ProductActionTitle.SET_PRODUCT_LOADING:
      return { ...state, isLoading: action.payload };
    case ProductActionTitle.SET_IS_PRODUCT_EXIST:
      return { ...state, isProductExist: action.payload };
    default:
      return state;
  }
};

export function getProduct(id: number | string) {
  return async (dispatch: any) => {
    try {
      dispatch(setProductLoadingAction(true));
      const response = await requestHandlers.getProduct(id);
      dispatch(setProductAction(response.data));
      dispatch(setProductLoadingAction(false));
    } catch {
      dispatch(setProductLoadingAction(false));
      dispatch(setIsProductExist(false));
    }
  };
}

export const isProductExist = () => store.getState().product.isProductExist;
export const isProductLoadingSelector = () =>
  store.getState().product.isLoading;
export const productDataSelector = () => store.getState().product.data;
export const productRatingSelector = () => store.getState().product.data.rating;
export const productBrandSelector = () => store.getState().product.data.brand;
export const productStockSelector = () => store.getState().product.data.stock;
export const productDescriptionSelector = () =>
  store.getState().product.data.description;
export const productTitleSelector = () => store.getState().product.data.title;
export const productPriceSelector = () => store.getState().product.data.price;

// export const productDiscountSelector = () =>
//   store.getState().product.data.discountPercentage;

export const productDiscount = (state: RootState) => {
  const discount = state.product.data.discountPercentage;
  if (discount < 1) {
    return discount.toFixed(2);
  }
  return discount;
};

export const productDiscountSelector = () => productDiscount(store.getState());

export const productImagesSelector = () => store.getState().product.data.images;
export const productCategorySelector = () =>
  store.getState().product.data.category;
