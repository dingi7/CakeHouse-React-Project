export const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    let totalPrice = 0;
    let cart = []
    if(cartData){
        cart = JSON.parse(cartData);
        cart.forEach((c) => (totalPrice += c.item.price))
    }
    return {cart: cart, totalPrice: totalPrice + 5};
};

export const clearShoppingCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
}