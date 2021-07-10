/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Routes from '../routes';

import ExamplesScreen from '../screens/Examples';
import MagicCircleScreen from '../screens/MagicCircle';
import ScrollInterpolationScreen from '../screens/Interpolation';
import ColorInterpolationScreen from '../screens/Theme';
import PinchGestureScreen from '../screens/PinchGesture';
import DoubleTapScreen from '../screens/DoubleTap';
import CustomScrollViewScreen from '../screens/CustomScrollView';
import ColorPickerScreen from '../screens/ColorPicker';
import CircularProgressBarScreen from '../screens/CircularProgressBar';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<Routes>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Examples' component={ExamplesScreen} />
      <Stack.Screen name='MagicCircle' component={MagicCircleScreen} />
      <Stack.Screen
        name='ScrollInterpolation'
        component={ScrollInterpolationScreen}
      />
      <Stack.Screen
        name='ColorInterpolation'
        component={ColorInterpolationScreen}
      />
      <Stack.Screen name='PinchGesture' component={PinchGestureScreen} />
      <Stack.Screen name='DoubleTap' component={DoubleTapScreen} />
      <Stack.Screen
        name='CustomScrollView'
        component={CustomScrollViewScreen}
      />
      <Stack.Screen
        name='ColorPicker'
        component={ColorPickerScreen}
        options={{ gestureDirection: 'vertical' }}
      />
      <Stack.Screen
        name='CircularProgressBar'
        component={CircularProgressBarScreen}
      />
    </Stack.Navigator>
  );
}
