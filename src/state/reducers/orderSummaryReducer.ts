const initialOrderSummary = {
  subtotal: 0,
  isSubscribed: false,
};

export const orderSummaryReducer = (
  state = initialOrderSummary,
  action: { type: any; payload }
) => {
  switch (action.type) {
    case "SET_ORDER_SUMMARY":
      return { ...action.payload };
    case "RESET_ORDER_SUMMARY":
      return { ...initialOrderSummary };
    case "SET_IS_SUBSCRIBED":
      return { ...state, isSubscribed: action.payload };
    default:
      return state;
  }
};
