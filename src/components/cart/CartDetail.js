import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { infoNote } from '../root/CustomToastify';

const CartDetail = props => {
  const removeFromCart = product => {
    props.actions.removeFromCart(product);
    infoNote(`${product.productName} successfully deleted from cart!`);
  };

  return (
    <div>
      {props.cart.length < 1 ? (
        <Alert color='secondary'>
          There is not any item in your cart. Please go to{' '}
          <Link to='/'>
            <a className='alert-link'>home page</a>
          </Link>
        </Alert>
      ) : (
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quatity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.cart.map(cartItem => (
              <tr key={cartItem.product.id}>
                <th scope='row'>{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button color='danger' onClick={() => removeFromCart(cartItem.product)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: state.cartReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
