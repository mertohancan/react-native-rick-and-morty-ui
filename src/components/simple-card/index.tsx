import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { calWidth } from "src/constants/constants";
import { Characters } from "src/types/characters";

type SimpleCardProps = Characters & {
  onPress(): void;
  direction?: "row" | "column";
  isFavorite?: boolean;
};

const SimpleCard = ({
  name,
  status,
  species,
  gender,
  image,
  onPress,
  direction = "row",
  isFavorite,
}: SimpleCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.container}>
        <View style={{ ...styles.wrapper, flexDirection: direction }}>
          <ImageBackground
            resizeMode="cover"
            style={{
              ...styles.image,
              width: direction === "row" ? calWidth(110) : calWidth(150),
            }}
            src={image}
            alt={name}
          >
            {isFavorite && <Text style={styles.favorite}>♥</Text>}
          </ImageBackground>
          <View
            style={{
              marginLeft: direction === "row" ? 24 : 0,
            }}
          >
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>
              {species} ({status})
            </Text>
            <Text style={styles.description}>{gender}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },

  image: {
    width: calWidth(110),
    height: 120,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    width: calWidth(110),
  },
  description: {
    fontSize: 14,
  },
  favorite: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 28,
    color: "red",
    borderRadius: 50,
  },
});
