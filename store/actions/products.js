export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const addProduct = (title, imageUrl, price, description) => {
  return {
    type: ADD_PRODUCT,
    productData: {
      title,
      imageUrl,
      price,
      description,
    },
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productId: productId,
    productData: {
      title,
      imageUrl,
      description,
    },
  };
};
