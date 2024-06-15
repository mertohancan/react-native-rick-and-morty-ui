import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps } from "../router/types";
import { Characters } from "src/types/characters";
import { useCharacterList } from "src/hooks/useCharacterList";
import SimpleCard from "src/components/simple-card";

import Loader from "src/components/loader";
import { useViewMode } from "src/hooks/useViewMode";
import Typography from "src/components/typography";
import FlatListHeader from "./FlatListHeader";
import { useFavorites } from "src/contexts/favorites/useFavorites";

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const { viewMode, toggleViewMode, isGrid } = useViewMode();

  const numColumns = viewMode === "grid" ? 2 : 1;

  const {
    isLoader,
    hasError,
    characters,
    loadNextPage,
    setNameFilter,
    nameFilter,
    statusFilter,
    setStatusFilter,
  } = useCharacterList();

  const { isFavorite } = useFavorites();

  const handleNavigateDetails = (item: Characters) => {
    navigation.navigate("CharacterDetails", {
      id: item.id,
    });
  };

  if (hasError) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <FlatListHeader
        searchText={nameFilter}
        setSearchText={setNameFilter}
        status={statusFilter}
        setStatus={setStatusFilter}
        onToggleGrid={toggleViewMode}
        isGrid={isGrid}
      />
      <FlatList
        key={viewMode}
        style={styles.container}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={
          isLoader ? <Loader /> : <View style={{ marginBottom: 0 }} />
        }
        data={characters}
        renderItem={({ item }) => (
          <View style={isGrid ? styles.gridWrapper : styles.listWrapper}>
            <SimpleCard
              {...item}
              direction={isGrid ? "column" : "row"}
              onPress={() => handleNavigateDetails(item)}
              isFavorite={isFavorite(item.id)}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainer}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};
export default Home;

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  separator: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  gridWrapper: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
  },
  listWrapper: {
    width: "100%",
    justifyContent: "flex-start",
  },
  contentContainer: {
    justifyContent: "space-between",
    display: "flex",
    paddingBottom: 150,
  },
});
