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
  orderItems: [],
  total: 0
};

/**
 * ACTION CREATORS
 */
export const addToCart = item => ({type: ADD_TO_CART, item});
export const removeFromCart = item => ({type: REMOVE_FROM_CART, item});

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
      dispatch(createCartThunkCreator(userId));
    } else {
      // else if any of them are in cart, return that order
      dispatch(getCartThunkCreator(curCart.id));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCartThunkCreator = cartId =>
  // the contents of a cart will be eager-loaded with the order number from the order table!
  async dispatch => {
    try {
      // get all orderItems that are in the cart - orderItem table
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

export const updateCartTotalThunkCreator = cartId => async dispatch => {
  try {
    // get the whole cart
    const cart = await axios.get(`api/orders/${cartId}`);
    // reduce the prices of all contents
    const total = cart.orderItems.reduce((accum, currentItem) => {
      return accum + currentItem.price;
    }, 0);
    // go to the cart's api page and reduce the total
    axios.put(`api/orders/${cartId}`, {
      total
    });
    console.log('total after reduce from store/cart.js(119)', total);
    dispatch(calcTotal());
  } catch (error) {
    console.error(error);
  }
};

export const addToCartThunkCreator = (cartId, productId) => async dispatch => {
  try {
    // ajax to create new row in the orderItem table
    const newOrderItem = await axios.post(`/api/orderItems/${cartId}`, {
      productId
    });
    dispatch(addToCart(newOrderItem));
    dispatch(updateCartTotalThunkCreator(cartId));
  } catch (error) {
    console.error(error);
  }
};

export const checkoutThunkCreator = cartId =>
  // the contents of a cart will be eager-loaded with the order number from the order table!
  async dispatch => {
    try {
      // ajax to change the status of the order
      await axios.put(`api/orders/${cartId}`, {
        status: 'processing'
      });
      // create new cart immediately and fetch it
      dispatch(createCartThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };

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
    case GOT_CART:
      // when new or existing cart comes back from api, return the cart as a new state (replace whole state!)
      return action.cart;
    case ADD_TO_CART: {
      // when add to cart button clicked, update cart prop on state to include this new item
      // also needs to take care of the price - find the new item's price and add it to the current total

      //this code takes care of if the item is already in cart - will increase quantity by 1
      const updatedProducts = [...state.products];
      if (!updatedProducts.length) {
        updatedProducts.push(action.product);
      } else {
        // eslint-disable-next-line nonblock-statement-body-position
        for (let i = 0; i < updatedProducts.length; i++) {
          if (updatedProducts[i].id === action.product.id) {
            updatedProducts[i].quantity++;
            break;
          }
          updatedProducts.push(action.product);
        }
      }
      return {
        ...state,
        orderItems: updatedProducts
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
        orderItems: updatedProducts
      };
    }
    case CALC_TOTAL:
      // every element in the "products" array has a price - add them up
      return {
        ...state,
        total: state.orderItems.reduce((acc, currProd) => {
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
