import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productActions';
import ProductDetail from './ProductDetail';

//! ...props --> mevcut propları genişletiyoruz.
const AddOrUpdateProduct = ({ products, categories, getProducts, getCategories, saveProduct, ...props }) => {
  const [product, setProduct] = useState({});
  //! validation
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  //! useParams ile product id'yi alıyoruz.
  const { productId } = useParams();
  // console.log(productId);
  //! useSelector ve find metodlarını kullanarak update edilecek product'ı buluyoruz.
  const items = useSelector(state => state.productListReducer);
  const item = productId && items.find(item => item.id == productId);
  // console.log(item);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    //! add or update
    item !== undefined && setProduct(item);
  }, [item]);

  const handleChange = event => {
    const { name, value } = event.target; //! eventin içerisindeki name ve value değerlerini destructuring yapıyoruz.
    setProduct(previousProduct => ({
      ...previousProduct,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value //! categoryId inputu ise numbera çevir yoksa gerek yok.
    }));
    //! validation
    validate(name, value);
  };

  //! validation
  function validate(name, value) {
    if (name === 'productName' && value === '') {
      setErrors(previousErrors => ({ ...previousErrors, productName: 'Product name is required' }));
    } else {
      setErrors('');
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    saveProduct(product);
    // navigate(-1); //! bir önceki sayfaya gider
    navigate('/', { replace: true });
  };

  return (
    <div>
      <ProductDetail product={product} categories={categories} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
    </div>
  );
};

const mapStateToProps = state => {
  //! mevcut state'imizi oluşturuyoruz.
  return {
    // product,
    products: state.productListReducer,
    categories: state.categoryListReducer
  };
};

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
