import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import * as productActions from '../../redux/actions/productActions';
import { successNote } from '../root/CustomToastify';

const ProductList = props => {
  // console.log(props.products);

  useEffect(() => {
    props.actions.getProducts();
  }, []);

  const addCart = product => {
    //! quantity ilk defa burada gönderiyoruz.
    props.actions.addToCart({ quantity: 1, product });
    successNote(`${product.productName} successfully added to cart!`);
  };

  return (
    <div>
      <h3>
        <Badge color='warning'>Products</Badge>
        <Badge color='success'>{props.currentCategory.categoryName}</Badge>
      </h3>
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quatity Per Unit</th>
            <th>Units in Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map(product => (
            <tr key={product.id}>
              <th scope='row'>{product.id}</th>
              <td>
                <Link to={'/saveproduct/' + product.id} style={{ color: '#fff' }}>
                  {product.productName}
                </Link>
              </td>
              <td>{product.unitPrice}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitsInStock}</td>
              <td>
                <Button color='success' onClick={() => addCart(product)}>
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    //! currentCategory --> state içerisinden changeCategoryReducer'a map et
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      //   //! bu fonk ile categories içine verileri atıyoruz. useEffect kullanıyoruz.
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      //! sepete ekleyeceğimiz ürünün action'u burada kullanıyoruz.
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
