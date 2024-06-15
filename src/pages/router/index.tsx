import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import createBottomTabNavigator
import Home from "../home";
import Profile from "../my-favorites";
import { NavigationContainer } from "@react-navigation/native";
import CharacterDetails from "../character-details";
import { PAGES } from "src/constants/pages";
import MyFavorites from "../my-favorites";
import { FavoritesProvider } from "src/contexts/favorites/FavoritesContext";

const INITIAL_STACK_OPTIONS = {
  orientation: "portrait",
  headerShown: false,
};

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={"Home"}
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: { fontSize: 18, paddingBottom: 12 },
      })}
    >
      <BottomTab.Screen name={PAGES.HOME} component={Home} />
      <BottomTab.Screen name={PAGES.FAVORITES} component={Profile} />
    </BottomTab.Navigator>
  );
};

const Router = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"BottomTabs"}>
          <Stack.Screen
            options={INITIAL_STACK_OPTIONS}
            name={"BottomTabs"}
            component={BottomTabs}
          />
          <Stack.Screen
            options={INITIAL_STACK_OPTIONS}
            name={PAGES.FAVORITES}
            component={MyFavorites}
          />
          <Stack.Screen
            options={INITIAL_STACK_OPTIONS}
            name={PAGES.CHARACTER_DETAILS}
            component={CharacterDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default Router;
