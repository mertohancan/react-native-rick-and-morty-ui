import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RadioButton from "./";
import { RadioButtonProps } from "./types";

const mockProps: RadioButtonProps = {
  label: "Test Label",
  value: "test_value",
  selected: false,
  onSelect: jest.fn(),
};

describe("RadioButton", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<RadioButton {...mockProps} />);

    expect(getByText("Test Label")).toBeTruthy();
  });

  it("calls onSelect when radio button is pressed", () => {
    const { getByTestId } = render(<RadioButton {...mockProps} />);

    fireEvent.press(getByTestId("radioButton"));
    expect(mockProps.onSelect).toHaveBeenCalledWith("test_value");
  });

  it("renders selected state correctly when selected is true", () => {
    const { getByTestId } = render(
      <RadioButton {...mockProps} selected={true} />
    );

    const radioCircle = getByTestId("radioCircle");
    expect(radioCircle.props.style).toContainEqual({
      backgroundColor: "red",
    });
  });
});
