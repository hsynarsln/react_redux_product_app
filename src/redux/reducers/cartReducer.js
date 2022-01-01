import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      //! sepetin içinde bu eleman var mı?
      //! payload ile gelen ürün sepette yani state içinde var mı bul!!!
      var addedItem = state.find(c => c.product.id === action.payload.product.id);
      // console.log(addedItem);
      if (addedItem) {
        //! array'in referansını değiştirmemiz gerekiyor.
        var newState = state.map(cartItem => {
          if (cartItem.product.id === action.payload.product.id) {
            //! ürün sepette mevcut ise quantity 1 artırıyoruz.
            return Object.assign({}, addedItem, { quantity: addedItem.quantity + 1 });
          }
          //! map ile gezdiği ürünleri tek tek return edip newState içerisine atar.
          return cartItem;
        });
        return newState;
      } else {
        //! state'in bir kopyasını al. action ile gelen payloadı ekle
        return [...state, { ...action.payload }];
      }

    //! DELETE FROM CART
    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(cartItem => cartItem.product.id !== action.payload.id);
      return newState2;

    default:
      return state;
  }
};
