import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/**
 * INITIAL STATE
 */
const products = {};

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});

/**
 * THUNK CREATORS
 */
export const getAllProductsThunk = () => async dispatch => {
  console.log('entering thunk >>>>>>>>> ');
  try {
    const res = await axios.get('/api/products');
    dispatch(getAllProducts(res.data || products));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = products, action) {
  console.log('action >>>', action);
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
