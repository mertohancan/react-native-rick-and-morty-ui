import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SimpleCard from "./";
import { Characters } from "src/types/characters";

const mockCharacter: Characters = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

describe("SimpleCard", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <SimpleCard {...mockCharacter} onPress={() => {}} />
    );

    expect(getByText("Rick Sanchez")).toBeTruthy();
    expect(getByText("Human (Alive)")).toBeTruthy();
    expect(getByText("Male")).toBeTruthy();
  });

  it("renders favorite icon when isFavorite is true", () => {
    const { getByText } = render(
      <SimpleCard {...mockCharacter} onPress={() => {}} isFavorite={true} />
    );

    expect(getByText("♥")).toBeTruthy();
  });

  it("does not render favorite icon when isFavorite is false", () => {
    const { queryByText } = render(
      <SimpleCard {...mockCharacter} onPress={() => {}} isFavorite={false} />
    );

    expect(queryByText("♥")).toBeNull();
  });

  it("calls onPress when card is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <SimpleCard {...mockCharacter} onPress={onPressMock} />
    );

    fireEvent.press(getByText("Rick Sanchez"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
