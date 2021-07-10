import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { withDelay } from 'react-native-reanimated';

const backgroundImage = require('../../assets/images/like.jpeg');
const likeIcon = require('../../assets/images/heart.png');

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rTextStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(700, withTiming(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(1, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(0));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          ref={doubleTapRef}
          maxDelayMs={250}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground source={backgroundImage} style={styles.image}>
              <AnimatedImage
                source={likeIcon}
                style={[styles.image, styles.likeIcon, rStyle]}
                resizeMode='center'
              />
            </ImageBackground>
            <AnimatedText style={[styles.text, rTextStyle]}>
              🚀🚀🚀🚀
            </AnimatedText>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  likeIcon: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 35,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
});
