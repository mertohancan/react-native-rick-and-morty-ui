import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "src/components/typography";
import { Favorites } from "src/contexts/favorites/types";
import { useFavorites } from "src/contexts/favorites/useFavorites";

const FavoriteItem = React.memo(
  ({
    item,
    removeFavorite,
  }: {
    item: Favorites;
    removeFavorite: (id: number) => void;
  }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Typography style={styles.character}>{`${item.name}`}</Typography>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const MyFavorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const renderFavoriteItem = useCallback(
    ({ item }: { item: Favorites }) => (
      <FavoriteItem item={item} removeFavorite={removeFavorite} />
    ),
    [removeFavorite]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Typography style={styles.emptyText}>No favorites yet!</Typography>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: { width: 100, height: 100 },
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  character: {
    maxWidth: 120,
    textAlign: "center",
  },
});

export default MyFavorites;
