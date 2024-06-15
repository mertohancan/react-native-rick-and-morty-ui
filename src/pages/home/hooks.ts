import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  onExpand?(): void;
}

export const useSearch = ({ onExpand }: Props) => {
  const expanded = useSharedValue(0);

  const slideAnimationStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(expanded.value ? 180 : 0, { duration: 500 }),
      opacity: withTiming(expanded.value ? 1 : 0, { duration: 500 }),
    };
  });

  const toggleExpand = () => {
    expanded.value = expanded.value === 0 ? 1 : 0;
  };

  const onSearchPress = () => {
    toggleExpand();
    onExpand?.();
  };

  return {
    expanded,
    slideAnimationStyle,
    onSearchPress,
  };
};
