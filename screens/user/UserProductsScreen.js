import React from "react";
import { FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../../components/common/HeaderButton";
import ProductListItem from "../../components/shop/ProductListItem";
import Colors from "../../constants/Colors";

export default UserProductsScreen = (props) => {
  const { navigation } = props;
  const userProducts = useSelector((state) => state.products.userProducts);

  const onSelectHandler = (id, title) => {
    navigation.navigate("EditProduct", {
      productId: id,
      productTitle: title,
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
            onSelectHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="Edit Details"
            color={Colors.primary}
            onPress={() => {
              onSelectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button title="Delete" color={Colors.primary} onPress={() => {}} />
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
  };
};
