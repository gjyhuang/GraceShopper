import React from 'react';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {checkout} from '../../store/cart';

export default class CheckoutStripe extends React.Component {
  onToken = (token, addresses) => {
    console.log('processing payment!');
  };

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_uHnEMWMhgx8IqFXlQuJXKpuY00ll20C53t"
        token={this.props.handleCheckout}
      />
    );
  }
}
