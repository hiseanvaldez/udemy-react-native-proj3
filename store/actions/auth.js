import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

const errorMessage = (message) => {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Invalid password.";
      break;
    case "EMAIL_NOT_FOUND":
      return "User not found.";
      break;
    case "EMAIL_EXISTS":
      return "User already exists.";
      break;
    default:
      return "Something went wrong!";
      break;
  }
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIB-GUMH7gU7L_rf3VB3qaCqi2AjBKaeA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(errorMessage(resData.error.message));
    }

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expiryDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();

    saveDataToStorage(resData.idToken, resData.localId, expiryDate);
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIB-GUMH7gU7L_rf3VB3qaCqi2AjBKaeA",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(errorMessage(resData.error.message));
    }

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expiryDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();

    saveDataToStorage(resData.idToken, resData.localId, expiryDate);
  };
};

export const authenticate = (token, userId, expiry) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiry));
    dispatch({ type: AUTHENTICATE, token, userId });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expiry) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expiry);
  };
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate,
    })
  );
};
