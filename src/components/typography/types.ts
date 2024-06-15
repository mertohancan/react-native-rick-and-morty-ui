import { TextStyle } from "react-native";

export interface TypographyProps {
  type?: "regular" | "bold" | "italic";
  style?: TextStyle;
  children: React.ReactNode;
}
