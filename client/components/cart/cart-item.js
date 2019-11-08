import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {addToCart} from '../store/cart';
import {removeFromCart} from '../store/cart';
import {calcTotal} from '../store/cart';
// add import statement for Grace's cart item component and empty cart component!
// import {CartItems} from './cart/cartItem';
// import {EmptyCart} from './cart/emptyCart';

// if cart empty - load the <cart is empty> component
export class Cart extends React.Component {
  componentDidMount() {
    // re-calculate the total
    this.state.calcTotal();
  }

  handleAdd(event) {
    // add a copy of the target of the event to the list of items
    event.preventDefault();
    this.state.addItem(event.target);
    this.state.calcTotal();
  }

  handleRemove(event) {
    // remove one item of this kind from the array of items in cart
    event.preventDefault();
    this.state.removeItem(event.target.id);
    this.state.calcTotal();
  }

  render() {
    return state.itemsInCart ? (
      <CartItems
        cartItems={this.state.itemsInCart}
        handleAdd={this.state.addItem}
        handleRemove={this.state.removeItem}
      />
    ) : (
      <EmptyCart />
    );
  }
}

// get the list of items in the cart from the store
const mapStateToProps = function(state) {
  return {
    itemsInCart: state.cart.products,
    total: state.cart.total
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    // get the add item function from store
    addItem: dispatch(addToCart(product)),
    // get the remove item function
    removeItem: dispatch(removeFromCart(product)),
    calcTotal: dispatch(calcTotal())
  };
};

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
