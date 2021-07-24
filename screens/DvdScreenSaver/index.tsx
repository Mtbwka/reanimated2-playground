import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  useAnimatedRef,
  measure,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

console.log('width :>> ', width);

const OFFSET = 120;
const DURATION = 5000;
const TOP_BORDER = 0;
const RIGHT_BORDER = width - OFFSET;
const BOTTOM_BORDER = height - OFFSET;
const LEFT_BORDER = 0;

const TIMING_CONFIG = {
  duration: DURATION,
  easing: Easing.ease,
};

const VERTICAL_TIMING = {
  duration: DURATION,
  easing: Easing.ease,
};

export default () => {
  const translateX = useSharedValue(1);
  const translateY = useSharedValue(1);
  //   useDerivedValue(() => {
  //     console.log('translateX.value :>> ', translateX.value);
  //     console.log('translateY.value :>> ', translateY.value);
  //   });

  //   useEffect(() => {
  //     translateX.value = withTiming(RIGHT_BORDER, TIMING_CONFIG);
  //     translateY.value = withTiming(BOTTOM_BORDER / 2, VERTICAL_TIMING);
  //   }, []);

  const rStyle = useAnimatedStyle(() => {
    const translateYInterpolation = interpolate(translateY.value, [], []);
    const translateXInterpolation = interpolate(
      translateX.value,
      [0, 1],
      [0, RIGHT_BORDER]
    );

    return {
      transform: [
        { translateX: translateXInterpolation },
        { translateY: translateYInterpolation },
        // { rotate: rotate.value },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text style={[styles.dvd, rStyle]}>DVD</Animated.Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  dvd: {
    fontSize: 40,
    letterSpacing: 15,
  },
});

// if (translateX.value >= RIGHT_BORDER) {
//   translateX.value = withTiming(LEFT_BORDER, TIMING_CONFIG);
//   translateY.value = withTiming(RIGHT_BORDER * 2, TIMING_CONFIG);
//   //   translateY.value = withTiming(RIGHT_BORDER * 2, TIMING_CONFIG);
// } else if (translateX.value <= LEFT_BORDER) {
//   translateX.value = withTiming(RIGHT_BORDER, TIMING_CONFIG);
//   translateY.value = withTiming(RIGHT_BORDER * 3, TIMING_CONFIG);
//   //   translateY.value = withTiming(RIGHT_BORDER * 2, TIMING_CONFIG);
// }

// if (translateY.value === BOTTOM_BORDER) {
//   translateY.value = RIGHT_BORDER * 2;
// }

// if (translateY.value >= BOTTOM_BORDER) {
//   translateY.value = withTiming(TOP_BORDER / 2, VERTICAL_TIMING);
// } else if (translateY.value <= TOP_BORDER) {
//   translateY.value = withTiming(BOTTOM_BORDER / 2, VERTICAL_TIMING);
// }
