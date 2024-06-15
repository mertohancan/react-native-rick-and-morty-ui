import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Characters } from "src/types/characters";

export type RootStackParamList = {
  Home: undefined;
  CharacterDetails: Pick<Characters, "id">;
  MyFavorites: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
