import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/common/Card";

import CartListItem from "../../components/shop/CartListItem";
import Colors from "../../constants/Colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

export default CartScreen = (props) => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const itemArray = [];
    for (const key in state.cart.items) {
      itemArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return itemArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.summaryAmount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Place Order"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, totalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartListItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  summaryAmount: {
    color: Colors.primary,
  },
});
