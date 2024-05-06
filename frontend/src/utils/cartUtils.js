const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
 };

 export const updateCart = (state) => {
    state.itemPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    state.shippedPrice = addDecimals(state.itemPrice > 100 ? 0 : 10); // Todo: add shipping policy
    state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));
    state.totalPrice = (Number(state.itemPrice) + Number(state.shippedPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
  };