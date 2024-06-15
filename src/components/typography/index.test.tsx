import React from "react";
import { render } from "@testing-library/react-native";
import Typography from "./";

describe("Typography", () => {
  it("renders correctly with default type", () => {
    const { getByText } = render(<Typography>Default Text</Typography>);
    const textElement = getByText("Default Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      color: "#333",
    });
  });

  it("renders correctly with bold type", () => {
    const { getByText } = render(
      <Typography type="bold">Bold Text</Typography>
    );
    const textElement = getByText("Bold Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toContainEqual({
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    });
  });

  it("renders correctly with italic type", () => {
    const { getByText } = render(
      <Typography type="italic">Italic Text</Typography>
    );
    const textElement = getByText("Italic Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      fontStyle: "italic",
      color: "#333",
    });
  });

  it("applies custom styles correctly", () => {
    const customStyle = { color: "blue" };
    const { getByText } = render(
      <Typography style={customStyle}>Custom Style Text</Typography>
    );
    const textElement = getByText("Custom Style Text");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      color: "#333",
    });
    expect(textElement.props.style).toContainEqual(customStyle);
  });
});
