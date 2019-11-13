import React from 'react';
import {connect} from 'react-redux';
import {getUserThunk, updateUserThunk} from '../store/user';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfileThunk();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      shippingAddress: event.target.shippingAddress.value
    };
    this.props.updateUserProfileThunk(data);
  }

  render() {
    const {user} = this.props;
    console.log(user);
    if (!user) {
      return (
        <div>
          <h1>Sorry Cannot View User Profile</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <h1>Hi {user.firstName}!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              defaultValue={user.firstName}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name: </label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
            />
          </div>
          <button type="submit" className="btn btn-light">
            Update Profile
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfileThunk: () => dispatch(getUserThunk()),
    updateUserProfileThunk: data => dispatch(updateUserThunk(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
