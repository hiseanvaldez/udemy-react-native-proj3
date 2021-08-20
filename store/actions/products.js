export const DELETE_PRODUCT = "DELETE_PRODCUT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};
