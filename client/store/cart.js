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
const ADDED_TO_CART = 'ADDED_TO_CART';
const REMOVED_FROM_CART = 'REMOVED_FROM_CART';
const GOT_CART = 'GOT_CART';

/**
 * INITIAL STATE
 */
const defaultCart = {
  orderId: null
};

/**
 * ACTION CREATORS
 */
const addedToCart = product => ({type: ADD_TO_CART, product});
const removedFromCart = product => ({type: REMOVE_FROM_CART, product});
const gotCart = orderId => ({type: GET_CART, orderId});

/**
 * THUNK CREATORS
 */
export const addToCartThunkCreator = product => async dispatch => {
  try {
    // ajax to create new row in the orderItem tablee
    // const productToAdd = await axios.post('/api/product')
    // dispatch added to cart
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */

export default function(state = defaultCart, action) {
  switch (action.type) {
    default:
      return state;
  }
}
