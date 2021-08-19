import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle: { fontFamily: "open-sans-bold" },
      headerBackTitleStyle: { fontFamily: "open-sans" },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
