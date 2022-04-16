import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/common/HeaderButton";
import { addProduct, updateProduct } from "../../store/actions/products";
import Input from "../../components/common/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidites = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updateIsFormValid = true;
    for (const key in updatedValidites) {
      updateIsFormValid = updateIsFormValid && updatedValidites[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidites,
      isFormValid: updateIsFormValid,
    };
  }
  return state;
};

export default EditProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productId = navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      description: product ? product.description : "",
      price: "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    isFormValid: product ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong Input", "Please check all fields.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      if (product) {
        await dispatch(
          updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          addProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description
          )
        );
      }

      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  const inputChangeHandler = useCallback(
    (input, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value,
        isValid: isValid,
        input: input,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            autoCapitalize="sentences"
            returnKeyType="next"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ""}
            isInitiallyValid={!!product}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image URL"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imageUrl : ""}
            isInitiallyValid={!!product}
            required
          />
          {product ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price"
              autoCapitalize="sentences"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              isInitiallyValid={!!product}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={product ? product.description : ""}
            isInitiallyValid={!!product}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
          onPress={navData.navigation.getParam("submit")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
