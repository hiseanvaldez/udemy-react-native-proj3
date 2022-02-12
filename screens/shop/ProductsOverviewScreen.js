import React, { useEffect } from "react";
import { FlatList, Platform, Button } from "react-native";
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

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
