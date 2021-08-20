import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";

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

      return {
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const item = state.items[action.productId];
      const currentQty = state.items[action.productId].quantity;
      let updatedCartItem;

      if (currentQty > 1) {
        const cartItem = new CartItem(
          item.productTitle,
          item.productPrice,
          item.quantity - 1,
          item.sum - item.productPrice
        );
        updatedCartItem = { ...state.items, [action.productId]: cartItem };
      } else {
        updatedCartItem = { ...state.items };
        delete updatedCartItem[action.productId];
      }

      return {
        ...state,
        items: updatedCartItem,
        totalAmount: state.totalAmount - item.productPrice,
      };
    }
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
