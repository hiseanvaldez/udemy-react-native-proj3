import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let cartItem;

      if (state.items[addedProduct.id]) {
        cartItem = new CartItem(
          productTitle,
          productPrice,
          state.items[addedProduct.id].quantity + 1,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        cartItem = new CartItem(productTitle, productPrice, 1, productPrice);
      }

      console.log(cartItem);

      return {
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const removedProduct = action.product;

      return state;
    }
    default:
      return state;
  }
};
