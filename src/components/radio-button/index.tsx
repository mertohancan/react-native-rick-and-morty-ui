import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RadioButtonProps } from "./types";

const RadioButton = ({
  label,
  value,
  selected,
  onSelect,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      style={styles.radioButton}
    >
      <View
        style={[styles.radioCircle, selected && styles.selectedRadioCircle]}
      />
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedRadioCircle: {
    backgroundColor: "red",
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioButton;
