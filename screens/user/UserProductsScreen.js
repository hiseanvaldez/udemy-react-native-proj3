import React from "react";
import { FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CustomHeaderButton from "../../components/common/HeaderButton";
import ProductListItem from "../../components/shop/ProductListItem";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

export default UserProductsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const onSelectHandler = (id) => {
    navigation.navigate("EditProduct", {
      productId: id,
    });
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductListItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            onSelectHandler(itemData.item.id);
          }}
        >
          <Button
            title="Edit"
            color={Colors.primary}
            onPress={() => {
              onSelectHandler(itemData.item.id);
            }}
          />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
            }}
          />
        </ProductListItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName={Platform.OS === "ios" ? "ios-create" : "md-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};
