import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const useAnimatedHeight = ({
  targetHeight,
  initialHeight,
}: {
  targetHeight: number;
  initialHeight: number;
}) => {
  const height = useSharedValue(initialHeight);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  useEffect(() => {
    height.value = withTiming(targetHeight, { duration: 1000 });
  }, []);

  return { animatedStyle };
};
