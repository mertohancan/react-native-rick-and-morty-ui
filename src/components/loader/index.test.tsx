import { render } from "@testing-library/react-native";
import Loader from "./";

describe("Loader", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<Loader />);

    const activityIndicator = getByTestId("indicator");
    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator.props.size).toBe("large");
    expect(activityIndicator.props.color).toBe("#0000ff");
  });

  it("renders correctly with custom props", () => {
    const { getByTestId } = render(<Loader size="small" color="#ff0000" />);

    const activityIndicator = getByTestId("indicator");
    expect(activityIndicator).toBeTruthy();
    expect(activityIndicator.props.size).toBe("small");
    expect(activityIndicator.props.color).toBe("#ff0000");
  });
});
