import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/common/HeaderButton";
import { addProduct, updateProduct } from "../../store/actions/products";

export default EditProductScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const productId = navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );

  const submitHandler = useCallback(() => {
    if (product) {
      dispatch(updateProduct(productId, title, imageUrl, description));
    } else {
      dispatch(addProduct(title, imageUrl, +price, description));
    }
  }, [dispatch, productId, title, imageUrl, price, description]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL:</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {product ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: { width: "100%" },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
