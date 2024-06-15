import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";

import { useSearch } from "./hooks";
import Animated from "react-native-reanimated";
import { RadioButton, Typography } from "src/components/";
import { Status } from "src/hooks/useCharacterList";

interface Props {
  onToggleGrid(): void;
  isGrid: boolean;
  searchText: string;
  setSearchText(text: string): void;
  status: Status;
  setStatus(text: Status): void;
}

const FlatListHeader = ({
  onToggleGrid,
  isGrid,
  searchText,
  setSearchText,
  status,
  setStatus,
}: Props) => {
  const { expanded, slideAnimationStyle, onSearchPress } = useSearch({
    onExpand: () => {
      setTimeout(() => {
        setSearchText("");
      }, 300);
    },
  });

  return (
    <>
      {expanded ? (
        <Animated.View style={[styles.searchContainer, slideAnimationStyle]}>
          <Typography type="bold">Filtrele</Typography>
          <TextInput
            style={styles.input}
            placeholder="İsme göre..."
            value={searchText}
            onChangeText={setSearchText}
          />

          <View style={styles.statusFilterWrapper}>
            <Typography>Statüye göre:</Typography>
            <View style={styles.radios}>
              <RadioButton
                label="Tümü"
                value=""
                selected={status === ""}
                onSelect={() => setStatus("")}
              />
              <RadioButton
                label="Canlı"
                value="alive"
                selected={status === "Alive"}
                onSelect={() => setStatus("Alive")}
              />
              <RadioButton
                label="Ölü"
                value="dead"
                selected={status === "Dead"}
                onSelect={() => setStatus("Dead")}
              />
              <RadioButton
                label="Bilinmiyor"
                value="unknown"
                selected={status === "unknown"}
                onSelect={() => setStatus("unknown")}
              />
            </View>
          </View>
        </Animated.View>
      ) : null}
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onToggleGrid} style={styles.toggleButton}>
          <Typography style={{ fontSize: 24 }}>{isGrid ? "𓊁" : "𓈈"}</Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearchPress} style={styles.toggleButton}>
          <Typography style={{ fontSize: 24 }}>🔎</Typography>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 5,
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
    zIndex: 1,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 12,
  },
  statusFilterWrapper: {
    marginTop: 20,
  },
  radios: {
    marginTop: 8,
    flexDirection: "row",
    gap: 24,
  },
});
