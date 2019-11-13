/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// NAVBAR
export {default as Navbar} from './navbar';

//Default Home Page
export {default as DefaultHome} from './defaultHome';

// USER
export {default as UserHome} from './user-home';
// export {default as EditProfile} from './edit-profile-form';

// LOGIN / SIGNUP
export {Login, Signup} from './auth-form';

// PRODUCTS
export {Products, SingleProduct, ProductsWrapper} from './products';

// CART
export {Cart, CartItem, CartWrapper, EmptyCart} from './cart';
