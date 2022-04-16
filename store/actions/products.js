import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        "https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const products = [];
      for (const key in resData) {
        products.push(
          new Product(
            key,
            userId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: products, userId });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const addProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    const { userId, token } = getState().auth;

    const response = await fetch(
      `https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
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

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        price,
        description,
        userId,
      },
    });
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://udemy-reactnative-8c58e-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: productId,
      productData: {
        title,
        imageUrl,
        description,
      },
    });
  };
};
