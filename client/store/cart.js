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
const GET_CART = 'GET_CART';
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
export const getCart = userId => ({type: GET_CART});
export const gotCart = orderId => ({type: GOT_CART, orderId});

/**
 * THUNK CREATORS
 */

// export const getCartThunkCreator = (userId) => {
//   async dispatch => {
//     try {
//       const {data} = await axios.get('/')
//     } catch (error) {

//     }
//   }
// }
// export const addToCartThunkCreator = product => async dispatch => {
//   try {
//     // ajax to create new row in the orderItem tablee
//     // const productToAdd = await axios.post('/api/product')
//     // dispatch added to cart
//   } catch (error) {
//     console.error(error);
//   }
// };

export const addToCartThunk = product => (dispatch, getState) => {
  let state = getState();
  console.log('state!', state);
  dispatch(addToCart(product));
};

/**
 * REDUCER
 */

export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // when add to cart button clicked, update cart prop on state to include this new item
      // also needs to take care of the price - find the new item's price and add it to the current total

      //this code takes care of if the item is already in cart - will increase quantity by 1
      const updatedProducts = [...state.products];
      if (!updatedProducts.length) updatedProducts.push(action.product);
      else
        for (let i = 0; i < updatedProducts.length; i++) {
          if (updatedProducts[i].id === action.product.id) {
            updatedProducts[i].quantity++;
            break;
          }
          updatedProducts.push(action.product);
        }
      return {
        ...state,
        products: updatedProducts,
        total: state.total + action.product.price
      };
    }
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
