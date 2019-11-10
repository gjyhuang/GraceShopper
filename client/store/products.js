import axios from 'axios';
import history from '../history';
import {addToCart} from '../store/cart';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
// const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  product: {}
};

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});

// const getSingleProduct = product => ({
//   type:
// })

/**
 * THUNK CREATORS
 */
export const getAllProductsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    dispatch(getAllProducts(res.data || products));
  } catch (err) {
    console.error(err);
    //need to change this to handle errors
  }
};

export const addToCartThunk = product => dispatch => {
  dispatch(addToCart(product));
};

/**
 * REDUCER
 */
export default function(state = initialState.products, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
