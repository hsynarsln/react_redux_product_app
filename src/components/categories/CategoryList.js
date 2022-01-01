import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as productActions from '../../redux/actions/productActions';

const CategoryList = props => {
  // console.log(props);

  //! useEffect ile dispacth ettiğimiz categoryName'leri categories olarak çekiyoruz.
  useEffect(() => {
    props.actions.getCategories();
  }, []);

  const selectCategory = category => {
    props.actions.changeCategory(category);
    //! categoryId parametre olarak gönderiyoruz. ProducList'de sadece o kategoriye ait ürünleri listelemek için
    props.actions.getProducts(category.id);
  };

  return (
    <div>
      <div>
        <h3>
          <Badge color='warning'>Categories</Badge>
        </h3>
      </div>
      <ListGroup>
        {props.categories.map(category => (
          //! active -> background = blue
          <ListGroupItem active={category.id === props.currentCategory.id ? true : false} key={category.id} onClick={() => selectCategory(category)}>
            {category.categoryName}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    //! currentCategory --> state içerisinden changeCategoryReducer'a map et
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      //   //! bu fonk ile categories içine verileri atıyoruz. useEffect kullanıyoruz.
      getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
      //   //! changeCategory ile category'e tıkladığımız zaman currentCategory'e atama yapıyoruz.
      changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
      //! producList componentinde id'ye göre seçili ürünleri listelemek için burada da çağırmamız gerekir.
      getProducts: bindActionCreators(productActions.getProducts, dispatch)
    }
  };
};
// const mapDispatchToProps = dispatch => ({
//   getCategories: () => dispatch(getCategories()),
//   changeCategory: () => dispatch(changeCategory())
// });

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
