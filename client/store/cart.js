import axios from 'axios';
import history from '../history';

/* EV: functionalities that should be brought in here:
1. add an item to the cart
2. remove an item from the cart
3. see my cart (this is going to be tied to the nav bar - you click a button that says "my cart")
4. submit my cart (i.e. make purchase) - includes decrementing our stock */

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHECKOUT = 'CHECKOUT';
const CALC_TOTAL = 'CALC_TOTAL';
// for thunk creator, need two actions - one to dispatch when you want to see the cart, the other when you got the cart and want to update state accordingly
const GOT_CART = 'GOT_CART';

/**
 * INITIAL STATE
 */
const defaultCart = {
  products: [],
  total: 0
};

/**
 * ACTION CREATORS
 */
export const addToCart = product => ({type: ADD_TO_CART, product});
export const removeFromCart = product => ({type: REMOVE_FROM_CART, product});
export const checkout = () => ({type: CHECKOUT});
export const calcTotal = () => ({type: CALC_TOTAL});
export const gotCart = cart => ({type: GOT_CART, cart});

/**
 * THUNK CREATORS
 */

export const getCartIdThunkCreator = userId => async dispatch => {
  try {
    // get the user's object
    const {data} = await axios.get(`/users/${userId}`);
    // in data of user's object, their orders are eager-loaded in an array.
    const {orders} = data;
    const curCart = orders.filter(order => {
      return order.status === 'in cart';
    });
    // if that array is empty, create new cart
    if (!curCart.id) {
      // dispatch create cart thunk
    } else {
      // else if any of them are in cart, return that order
      dispatch(getCartContentsThunkCreator(curCart.id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCartContentsThunkCreator = cartId =>
  // the contents of a cart will be eager-loaded with the order number from the order table!
  async dispatch => {
    try {
      // get all products that are in the cart - orderItem table
      const {data} = await axios.get(`api/orders/${cartId}`);
      dispatch(gotCart(data));
    } catch (error) {
      console.error(error);
    }
  };

export const createCartThunkCreator = userId =>
  // create new row in orders table, with user id and status "in cart"
  async dispatch => {
    try {
      const {data} = await axios.post('/api/orders/', {
        userId,
        status: 'in cart'
      });
      dispatch(gotCart(data));
    } catch (error) {
      console.error(error);
    }
  };

export const addToCartThunkCreator = (
  cartId,
  productId
) => async dispatch => async dispatch => {
  try {
    // ajax to create new row in the orderItem table
    const {data} = await axios.post(`/api/orderItems/${cartId}`, {productId});
    // fetch the cart again
    dispatch(getCartContentsThunkCreator(cartId));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // when add to cart button clicked, update cart prop on state to include this new item
      // also needs to take care of the price - find the new item's price and add it to the current total
      return {
        ...state,
        products: [...state.products, action.product],
        total: state.total + action.product.price
      };
    case REMOVE_FROM_CART:
      // find the removed product via product id and return the cart without it
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id !== action.product.id) {
            return product;
          }
        })
      };
    case CALC_TOTAL:
      // every element in the "products" array has a price - add them up
      return {...state, total: state.products.reduce(() => {}, state.total)};
    case CHECKOUT:
      // when checkout button is clicked (TIER 1), clear the cart and the total
      return defaultCart;
    default:
      return state;
  }
}
