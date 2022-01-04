import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import * as cartActions from '../../redux/actions/cartActions';
import { infoNote } from '../root/CustomToastify';

const CartSummary = () => {
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const removeFromCart = product => {
    dispatch(cartActions.removeFromCart(product));
    // props.actions.removeFromCart(product);
    infoNote(`${product.productName} successfully deleted from cart!`);
  };

  return (
    <div>
      {cart.length > 0 ? (
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            Your Cart
          </DropdownToggle>
          <DropdownMenu right>
            {cart.map(cartItem => (
              <DropdownItem key={cartItem.product.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Badge color='danger' onClick={() => removeFromCart(cartItem.product)}>
                  X
                </Badge>
                {cartItem.product.productName}
                <Badge color='success'>{cartItem.quantity}</Badge>
              </DropdownItem>
            ))}
            <DropdownItem divider />
            <DropdownItem>
              <Link to={'/cart'}>Go to Cart</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : (
        <NavItem>
          <NavLink>Cart is empty!</NavLink>
        </NavItem>
      )}
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     // cart: state.cartReducer
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: {
//       // removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
//     }
//   };
// };

export default CartSummary;
