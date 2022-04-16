import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";

import Colors from "../constants/Colors";
import { authenticate } from "../store/actions/auth";
import { useDispatch } from "react-redux";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        navigation.navigate("Auth");
        return;
      }

      const { expiryDate, token, userId } = await JSON.parse(userData);

      if (new Date(expiryDate) <= new Date()) {
        navigation.navigate("Auth");
        return;
      }

      const expirationTime =
        new Date(expiryDate).getTime() - new Date().getTime();

      navigation.navigate("Shop");
      dispatch(authenticate(token, userId, expirationTime));
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
