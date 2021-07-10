import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

import Page, { PAGE_WIDTH } from './components/Page';

type ContextType = {
  x: number;
};

const titles = ["What's", 'up', 'react', 'devs?'];
const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

export default () => {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() =>
    Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X)
  );

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
          {titles.map((title, index) => (
            <Page
              title={title}
              index={index}
              translateX={clampedTranslateX}
              key={index.toString()}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
