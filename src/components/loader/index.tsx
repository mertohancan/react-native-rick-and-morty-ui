import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { LoaderProps } from "./types";

const Loader = ({ size = "large", color = "#0000ff" }: LoaderProps) => (
  <View style={styles.container}>
    <ActivityIndicator testID="indicator" size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
