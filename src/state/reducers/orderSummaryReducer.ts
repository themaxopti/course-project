const initialOrderSummary = {
  subtotal: 0,
  isDiscount: false,
};

export const orderSummaryReducer = (state = initialOrderSummary, action: any) => {
  switch (action.type) {
    case 'SET_ORDER_SUMMARY':
      return { ...action.payload };
    default:
      return state;
  }
};
