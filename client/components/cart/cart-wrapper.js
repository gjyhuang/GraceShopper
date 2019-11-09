import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {addToCart, removeFromCart, calcTotal} from '../../store/cart';
import {Cart} from '../cart';
// add import statement for Grace's cart item component and empty cart component!
// import {CartItems} from './cart/cartItem';
// import {EmptyCart} from './cart/emptyCart';

// if cart empty - load the <cart is empty> component
export class CartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    // re-calculate the total
    this.props.calcTotal();
  }

  handleAdd(event) {
    // add a copy of the target of the event to the list of items
    event.preventDefault();
    this.props.addItem(event.target);
    this.props.calcTotal();
  }

  handleRemove(event) {
    // remove one item of this kind from the array of items in cart
    event.preventDefault();
    this.props.removeItem(event.target.id);
    this.props.calcTotal();
  }

  render() {
    return this.props.itemsInCart.length > 0 ? (
      <div>
        <div> this is the cart wrapper component</div>
        <Cart
          cartItems={this.props.itemsInCart}
          handleAdd={this.addItem}
          handleRemove={this.removeItem}
        />
      </div>
    ) : (
      <div>Your cart is empty!</div>
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
    addItem: product => dispatch(addToCart(product)),
    // get the remove item function
    removeItem: product => dispatch(removeFromCart(product)),
    calcTotal: () => dispatch(calcTotal())
  };
};

const ConnectedCartWrapper = connect(mapStateToProps, mapDispatchToProps)(
  CartWrapper
);

export default ConnectedCartWrapper;
