import { store } from "../../store";

type ActionType = SetIsProductExist;

export interface InitialState {
  discountHeader: boolean;
}

type SetIsProductExist = {
  type: ComponentsPropertiesActionTitle.SET_IS_DISCOUNT_HEADER;
  payload: boolean;
};

export enum ComponentsPropertiesActionTitle {
  SET_IS_DISCOUNT_HEADER = "SET_IS_DISCOUNT_HEADER",
}

export const setIsDiscountHeaderExist = (payload: boolean) => {
  return {
    type: ComponentsPropertiesActionTitle.SET_IS_DISCOUNT_HEADER,
    payload,
  };
};

const initialState: InitialState = {
  discountHeader: true,
};

export const componetsPropertiesReducer = (
  state = initialState,
  action: ActionType
): InitialState => {
  switch (action.type) {
    case ComponentsPropertiesActionTitle.SET_IS_DISCOUNT_HEADER:
      return { ...state, discountHeader: action.payload };
    default:
      return state;
  }
};

export const isDiscountHeaderExist = () => store.getState().componetsProperties.discountHeader;