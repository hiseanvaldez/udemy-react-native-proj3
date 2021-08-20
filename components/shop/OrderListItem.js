import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../common/Card";
import CartListItem from "./CartListItem";

export default OrderListItem = (props) => {
  const [isDetailsShown, setIsShownDetails] = useState(false);

  return (
    <Card style={styles.orderContainer}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={isDetailsShown ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setIsShownDetails((prevState) => !prevState);
        }}
      />
      {isDetailsShown && (
        <View style={styles.itemContainer}>
          {props.items.map((cartItem) => (
            <CartListItem
              key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
});
