import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import products from './products';
import cart from './cart';
// import {loadLocalCart, saveLocalCart} from './localStorage';

const reducer = combineReducers({user, products, cart});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

// const preloadedState = loadLocalCart();

const store = createStore(reducer, /* preloadedState, */ middleware);
// store.subscribe(() => {
//   saveLocalCart({
//     cart: store.getState().cart
//   });
// });

export default store;
export * from './user';
export * from './products';
