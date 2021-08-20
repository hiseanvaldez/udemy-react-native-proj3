import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default UserProductsScreen = (props) => {
  const { navigation } = props;

  const productId = navigation.getParam("productId");
  const product = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  console.log(product);
  return (
    <View>
      <Text>Edit Product Screen</Text>
    </View>
  );
};
