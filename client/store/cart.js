/* EV: functionalities that should be brought in here:
1. add an item to the cart
2. remove an item from the cart
3. see my cart
4. submit my cart (i.e. make purchase) - includes decrementing our stock */

/**
 * INITIAL STATE
 */
const defaultCart = {};

/**
 * ACTION CREATORS
 */
// syntax example: const getUser = user => ({type: GET_USER, user});

/**
 * THUNK CREATORS
 */
// syntax example: export const me = () => async dispatch => {try {} catch (err) {}}

/**
 * REDUCER
 */

export default function(state = defaultCart, action) {
  switch (action.type) {
    default:
      return state;
  }
}
