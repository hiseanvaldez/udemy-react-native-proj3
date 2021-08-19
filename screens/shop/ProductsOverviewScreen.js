import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductListItem from "../../components/shop/ProductListItem";
import { addToCart } from "../../store/actions/cart";

export default ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductListItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            navigation.navigate("ProductDetails", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

const styles = StyleSheet.create({});
