export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

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

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
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

    dispatch({ type: SIGNIN, token: resData.idToken, userId: resData.localId });
  };
};
