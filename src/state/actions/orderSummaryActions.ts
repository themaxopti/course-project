export function setOrderSummary(subtotal: number, isSubscribed: boolean) {
  return {
    type: "SET_ORDER_SUMMARY",
    payload: { subtotal, isSubscribed },
  };
}

export function resetOrderSummary() {
  return {
    type: "RESET_ORDER_SUMMARY",
  };
}

export function setIsSubscribed(isSubscribed: boolean) {
  return {
    type: "SET_IS_SUBSCRIBED",

    payload: isSubscribed,
  };
}
