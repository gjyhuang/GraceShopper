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
export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
});
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

export const addToCartThunk = productId => (dispatch, getState) => {
  let state = getState();
  const selectedProduct = state.products.find(
    product => product.id === Number(productId)
  );
  dispatch(addToCart(selectedProduct));
};

// hold for now
// export const removeFromCartThunk = productId => (dispatch, getState) => {
//   let state = getState();
//   console.log('state!', state.products);
//   // debugger;
//   const selectedProduct = state.products.find(product => product.id === Number(productId));
//   console.log('selectedProduct', selectedProduct)
//   dispatch(removeFromCart(selectedProduct));
// };

/**
 * REDUCER
 */

// eslint-disable-next-line complexity
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // when add to cart button clicked, update cart prop on state to include this new item
      // also needs to take care of the price - find the new item's price and add it to the current total

      //this code takes care of if the item is already in cart - will increase quantity by 1
      const updatedProducts = [...state.products];
      // debugger;
      if (!updatedProducts.length) updatedProducts.push(action.product);
      else {
        const productToAdd = updatedProducts.find(
          item => item.id === action.product.id
        );
        if (productToAdd) productToAdd.quantity++;
        else updatedProducts.push(action.product);
      }
      return {
        ...state,
        products: updatedProducts
      };
    }
    case REMOVE_FROM_CART: {
      // find the removed product via product id and return the cart without it
      const updatedProducts = [...state.products];
      const itemToDecrease = updatedProducts.find(
        item => item.id === Number(action.productId)
      );
      itemToDecrease.quantity--;
      if (itemToDecrease.quantity === 0) {
        updatedProducts.splice(updatedProducts.indexOf(itemToDecrease), 1);
      }
      return {
        ...state,
        products: updatedProducts
      };
    }
    case CALC_TOTAL:
      // every element in the "products" array has a price - add them up
      return {
        ...state,
        total: state.products.reduce((acc, currProd) => {
          return currProd.price * currProd.quantity + acc;
        }, 0)
      };
    case CHECKOUT:
      // when checkout button is clicked (TIER 1), clear the cart and the total
      return defaultCart;
    default:
      return state;
  }
}
