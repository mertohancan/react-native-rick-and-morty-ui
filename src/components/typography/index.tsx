import React from "react";
import { Text, StyleSheet } from "react-native";
import { TypographyProps } from "./types";

const Typography = ({ type = "regular", style, children }: TypographyProps) => (
  <Text style={[styles[type], style]}>{children}</Text>
);

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  italic: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
  },
});

export default Typography;
