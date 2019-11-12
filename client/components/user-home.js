import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */

// on component did mount, check if the orders array includes one that's pending. If so, call getCartItemsThunkCreator on it. If not, call createCartThunkCreator.

export class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {email} = this.props;
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
  name: state.user.firstName
});

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
