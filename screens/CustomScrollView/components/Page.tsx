import React, { FC } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

export const { width: PAGE_WIDTH } = Dimensions.get('window');

const Page: FC<PageProps> = ({ title, index, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
        },
        rStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
