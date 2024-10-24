export function setOrderSummary(subtotal: number, isDiscount: boolean) {
  return {
    type: "SET_ORDER_SUMMARY",
    payload: { subtotal, isDiscount },
  };
}
