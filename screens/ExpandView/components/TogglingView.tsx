import React, { FC } from 'react';
import { StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface TogglingViewProps {
  title: string;
  description: string;
}

const HIT_SLOP = {
  right: 10,
  left: 10,
  top: 10,
  bottom: 10,
};

const { width } = Dimensions.get('window');

const TogglngView: FC<TogglingViewProps> = ({ title, description }) => {
  const expand = useSharedValue(0);
  const right = useSharedValue(0);

  const toggleView = () => {
    expand.value = expand.value === 0 ? 1 : 0;
  };

  const rDesriptionStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(`${interpolate(expand.value, [0, 1], [0, 100])}%`),
    };
  });

  const rIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: (withTiming(
          expand.value === 0 ? '0deg' : '180deg'
        ) as unknown) as string,
      },
    ],
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    fontSize: withTiming(
      interpolate(expand.value, [0, 1], [24, 32]),
      {},
      () => {
        right.value = withTiming(interpolate(expand.value, [0, 1], [0, width]));
      }
    ),
  }));

  const rUnderlineStyle = useAnimatedStyle(() => ({
    right: right.value,
  }));

  const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

  return (
    <Animated.View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleView} hitSlop={HIT_SLOP}>
        <Animated.Text style={[rTextStyle, styles.headerText]}>
          {title}
        </Animated.Text>
        <AnimatedIcon
          name='arrow-down'
          size={24}
          style={[rIconStyle, styles.icon]}
        />
      </Pressable>
      <Animated.View style={[rUnderlineStyle, styles.underline]} />

      <Animated.View style={[rDesriptionStyle, styles.expandViewContainer]}>
        <Text style={styles.text}>{description}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default TogglngView;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    marginRight: 24,
    width: '80%',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
  },
  expandViewContainer: {},
  icon: {},
  underline: {
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
});
