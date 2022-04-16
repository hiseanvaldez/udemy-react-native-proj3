import React from "react";
import { StyleSheet, View } from "react-native";

export default Card = ({ cardStyle, children }) => {
  return <View style={{ ...styles.card, ...cardStyle }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
