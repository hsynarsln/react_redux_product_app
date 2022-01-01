import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { categoryListReducer } from './categoryListReducer';
import { changeCategoryReducer } from './changeCategoryReducer';
import { productListReducer } from './productListReducer';
import { saveProductReducer } from './saveProductReducer';

const rootReducer = combineReducers({
  changeCategoryReducer,
  categoryListReducer,
  productListReducer,
  cartReducer,
  saveProductReducer
});

export default rootReducer;
