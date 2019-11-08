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
const CHECKOUT = 'CHECKOUT';

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
const addedToCart = product => ({type: ADDED_TO_CART, product});
const removedFromCart = product => ({type: REMOVED_FROM_CART, product});
const gotCart = orderId => ({type: GOT_CART, orderId});
const checkout = () => ({type: CHECKOUT});

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
    case ADDED_TO_CART:
      // when add to cart button clicked, update cart prop on state to include this new item
      // also needs to take care of the price - find the new item's price and add it to the current total
      return {
        ...state,
        products: [...state.products, action.product],
        total: state.total + action.product.price
      };
    case REMOVED_FROM_CART:
      // find the removed product via product id and return the cart without it
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id !== action.product.id) {
            return product;
          }
        })
      };
    case CHECKOUT:
      // when checkout button is clicked (TIER 1), clear the cart and the total
      return defaultCart;
    default:
      return state;
  }
}
