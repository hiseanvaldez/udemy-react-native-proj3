import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../common/Card";

export default ProductListItem = ({
  title,
  image,
  price,
  onSelect,
  children,
}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card cardStyle={styles.productContainer}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>$ {price?.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  detailsContainer: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
});
