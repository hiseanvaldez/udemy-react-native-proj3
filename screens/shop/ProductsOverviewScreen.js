import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../../components/common/HeaderButton";
import ProductListItem from "../../components/shop/ProductListItem";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

export default ProductsOverviewScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
        <Text>Start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductListItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="View Details"
            color={Colors.primary}
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            title="Add to Cart"
            color={Colors.primary}
            onPress={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        </ProductListItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
