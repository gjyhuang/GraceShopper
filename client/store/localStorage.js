export const loadLocalCart = () => {
  try {
    const localCart = localStorage.getItem('cart');
    if (localCart === null) {
      return undefined;
    }
    return JSON.parse(localCart);
  } catch (err) {
    return undefined;
  }
};

export const saveLocalCart = cart => {
  try {
    const localCart = JSON.stringify(cart);
    localStorage.setItem('cart', localCart);
  } catch (err) {
    console.error(err);
  }
};
