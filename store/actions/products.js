import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );

    const resData = await response.json();
    const products = [];
    for (const key in resData) {
      products.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({ type: SET_PRODUCTS, products: products });
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const addProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        price,
        description,
      },
    });
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
