import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Button } from 'react-native';

import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const DEFAULT_SCALE = 1;

const DURATION = 1000;
const DOT_CONFIG = {
  duration: DURATION,
};
const DOT_MAX_SCALE = 2;

export default () => {
  const dotOneScale = useSharedValue(DEFAULT_SCALE);
  const dotTwoScale = useSharedValue(DEFAULT_SCALE);
  const dotThreeScale = useSharedValue(DEFAULT_SCALE);

  const [loading, setLoading] = useState(false);

  const onButtonPress = () => {
    setLoading(prev => !prev);
  };

  useDerivedValue(() => {
    return {};
  });

  useEffect(() => {
    if (loading) {
      // VARIANT ONE
      //   dotOneScale.value = withRepeat(
      //     withTiming(DOT_MAX_SCALE, DOT_CONFIG),
      //     2,
      //     true,
      //     () => {
      //       dotTwoScale.value = withRepeat(
      //         withTiming(DOT_MAX_SCALE, DOT_CONFIG),
      //         2,
      //         true,
      //         () => {
      //           dotThreeScale.value = withRepeat(
      //             withTiming(DOT_MAX_SCALE, DOT_CONFIG),
      //             2,
      //             true
      //           );
      //         }
      //       );
      //     }
      //   );

      // VARIANT TWO
      dotOneScale.value = withRepeat(
        withTiming(DOT_MAX_SCALE, DOT_CONFIG),
        -1,
        true
      );
      dotTwoScale.value = withDelay(
        DURATION / 2,
        withRepeat(withTiming(DOT_MAX_SCALE, DOT_CONFIG), -1, true)
      );
      dotThreeScale.value = withDelay(
        DURATION,
        withRepeat(withTiming(DOT_MAX_SCALE, DOT_CONFIG), -1, true)
      );
    } else {
      cancelAnimation(dotOneScale);
      cancelAnimation(dotTwoScale);
      cancelAnimation(dotThreeScale);

      dotOneScale.value = withTiming(DEFAULT_SCALE, DOT_CONFIG);
      dotTwoScale.value = withTiming(DEFAULT_SCALE, DOT_CONFIG);
      dotThreeScale.value = withTiming(DEFAULT_SCALE, DOT_CONFIG);
    }
  }, [loading]);

  const rStyleDotOne = useAnimatedStyle(() => ({
    transform: [{ scale: dotOneScale.value }],
  }));

  const rStyleDotTwo = useAnimatedStyle(() => ({
    transform: [{ scale: dotTwoScale.value }],
  }));

  const rStyleDotThree = useAnimatedStyle(() => ({
    transform: [{ scale: dotThreeScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={styles.bubble}>
        <Animated.View style={[rStyleDotOne, styles.dot]} />
        <Animated.View style={[rStyleDotTwo, styles.dot]} />
        <Animated.View style={[rStyleDotThree, styles.dot]} />
      </Animated.View>

      <Button title='LOAD' onPress={onButtonPress} />
    </View>
  );
};

const CIRCLE_SIZE = width * 0.7;
const DOT_SIZE = CIRCLE_SIZE / 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loadingButton: {},
  bubble: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: 'blue',
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: 'white',
    borderRadius: DOT_SIZE / 2,
    zIndex: 2,
    marginHorizontal: 20,
  },
});
