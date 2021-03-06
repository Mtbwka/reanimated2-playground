import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../routes';

const examples = [
  {
    screen: 'MagicCircle',
    title: 'โบ Magic Circle',
  },
  {
    screen: 'ScrollInterpolation',
    title: '๐ Scroll Interpolation',
  },
  {
    screen: 'ColorInterpolation',
    title: 'โ๏ธ Color Interpolation',
  },
  {
    screen: 'PinchGesture',
    title: '๐ค Pinch Gesture',
  },
  {
    screen: 'DoubleTap',
    title: 'โค๏ธ Double Tap',
  },
  {
    screen: 'CustomScrollView',
    title: '๐ Custom Scroll View',
  },
  {
    screen: 'ColorPicker',
    title: '๐จ Color Picker',
  },
  {
    screen: 'CircularProgressBar',
    title: 'โฃ๏ธ Circular Progress Bar',
  },
  {
    screen: 'DvdScreenSaver',
    title: '๐ DVD Screen Saver',
  },
  {
    screen: 'ExpandView',
    title: 'โ๏ธ Expand View',
  },
  {
    screen: 'LoadingBubble',
    title: '๐งผ Loading Bubble',
  },
] as const;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  thumbnail: {
    backgroundColor: 'white',
    padding: 32,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },
});

export default () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes, 'Examples'>>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {examples.map(thumbnail => (
          <RectButton
            key={thumbnail.screen}
            onPress={() => navigate(thumbnail.screen)}
          >
            <View style={styles.thumbnail}>
              <Text style={styles.title}>{thumbnail.title}</Text>
            </View>
          </RectButton>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
