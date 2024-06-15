import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProps, RootStackParamList } from "../router/types";
import { useGetCharacter } from "src/hooks/useGetCharacter";
import Typography from "src/components/typography";
import Loader from "src/components/loader";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedHeight } from "src/animations/useAnimatedHeight";
import { useFavorites } from "src/contexts/favorites/useFavorites";

const CharacterDetails = () => {
  const { params } = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<NavigationProps>();
  const { error, loader, data, lastEpisodeName } = useGetCharacter({
    id: params?.id || 0,
  });

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (params?.id === undefined) return;
    isFavorite(params.id)
      ? removeFavorite(params.id)
      : addFavorite({ id: params.id, name: data?.name, image: data?.image });
  };

  const animatedHeight = useAnimatedHeight({
    targetHeight: 300,
    initialHeight: 1000,
  });
  const wrapperPositionY = useSharedValue(1000);
  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: wrapperPositionY.value }],
    };
  });

  useEffect(() => {
    if (data && !loader && !error && params?.id) {
      // Veri yüklendiğinde hata yoksa, wrapper'ı yukarı doğru animasyonla aç
      wrapperPositionY.value = withTiming(0, { duration: 500 });
    }
  }, [data, loader, error, params?.id]);

  if (!data || loader || error || !params?.id) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Animated.View style={animatedHeight.animatedStyle}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={{ uri: data.image }}
          >
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.arrowLeftButton}
            >
              <Text style={styles.arrowLeft}>←</Text>
            </TouchableOpacity>
            <View style={styles.overlay} />
          </ImageBackground>
        </Animated.View>

        <Animated.View style={[styles.wrapper, wrapperStyle]}>
          <View style={styles.header}>
            <Typography type="bold" style={styles.name}>
              {data.name}
            </Typography>
            <TouchableOpacity onPress={toggleFavorite}>
              <Text style={styles.hearth}>
                {isFavorite(params.id) ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.informations}>
            <View>
              <Text style={styles.subtitle}>Gender</Text>
              <Text style={styles.subtext}>{data.gender}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Species</Text>
              <Text style={styles.subtext}>{data.species}</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Status</Text>
              <Text style={styles.subtext}>{data.status || "?"}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Animated.View>
            <View style={styles.information}>
              <Typography type="bold">Number of episodes</Typography>
              <Typography>{data.episode.length}</Typography>
            </View>
            <View style={styles.information}>
              <Typography type="bold">Origin</Typography>
              <Typography>{data.origin.name}</Typography>
            </View>
            <View style={styles.information}>
              <Typography type="bold">Last known location</Typography>
              <Typography>{data.location.name}</Typography>
            </View>
            <View style={styles.information}>
              <Typography type="bold">Last seen episode</Typography>
              <Typography>{lastEpisodeName}</Typography>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default CharacterDetails;

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderRadius: 24,
    backgroundColor: "white",
    zIndex: 2,
    marginTop: -24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  name: {
    fontSize: 32,
    fontWeight: 600,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hearth: {
    fontSize: 32,
    fontWeight: 600,
    color: "red",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
  },
  subtext: {
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    marginBottom: 20,
  },
  informations: {
    marginTop: 24,
    flexDirection: "row",
    gap: 60,
  },
  information: {
    marginBottom: 20,
  },
  arrowLeftButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  arrowLeft: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
});
