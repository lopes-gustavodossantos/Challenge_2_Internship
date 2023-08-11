import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './InitialScreen';
import RestaurantsListScreen from './RestaurantsListScreen';
import RestaurantDetailScreen from './RestaurantDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="InitialScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="RestaurantsListScreen" component={RestaurantsListScreen} />
      <Stack.Screen name="RestaurantDetailScreen" component={RestaurantDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
