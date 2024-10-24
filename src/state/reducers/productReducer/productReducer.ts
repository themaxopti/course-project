import { ProductType } from "../../../types/requestHandlers.types";
import { requestHandlers } from "../../../utils/requestHandlers";
import { store } from "../../store";

export interface InitialState {
  data: ProductType | null;
  isLoading: boolean;
}

type ActionType = SetProductActionType | SetProductLoadingActionType;

enum CartActionTypes {
  SET_PRODUCT = "SET_PRODUCT",
  SET_PRODUCT_LOADING = "SET_PRODUCT_LOADING",
}

type SetProductActionType = {
  type: CartActionTypes.SET_PRODUCT;
  payload: ProductType;
};

type SetProductLoadingActionType = {
  type: CartActionTypes.SET_PRODUCT_LOADING;
  payload: boolean;
};

export const setProductAction = (payload: ProductType) => {
  return { type: CartActionTypes.SET_PRODUCT, payload };
};

export const setProductLoadingAction = (payload: boolean) => {
  return { type: CartActionTypes.SET_PRODUCT_LOADING, payload };
};

const initialState: InitialState = {
  data: null,
  isLoading: true,
};

export const productReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case CartActionTypes.SET_PRODUCT:
      return { ...state, data: action.payload };
    case CartActionTypes.SET_PRODUCT_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};  

export function getProduct(id: number | string) {
  return async (dispatch: any) => {
    try {
      dispatch(setProductLoadingAction(true));
      const response = await requestHandlers.getProduct(id);
      console.log(response);
      dispatch(setProductAction(response.data));
      dispatch(setProductLoadingAction(false));
    } catch (error) {
      //   dispatch(fetchProductsFailure("Failed to fetch products"));
    }
  };
}


export const isProductLoadingSelector = () => store.getState().product.isLoading
export const productDataSelector = () => store.getState().product.data
export const productRatingSelector = () => store.getState().product.data.rating
export const productBrandSelector = () => store.getState().product.data.brand
export const productStockSelector = () => store.getState().product.data.stock
export const productDescriptionSelector = () => store.getState().product.data.description
export const productTitleSelector = () => store.getState().product.data.title
export const productPriceSelector = () => store.getState().product.data.price
export const productDiscountSelector = () => store.getState().product.data.discountPercentage
export const productImagesSelector = () => store.getState().product.data.images
export const productCategorySelector = () => store.getState().product.data.category
