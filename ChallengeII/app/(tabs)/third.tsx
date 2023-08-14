import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Restaurant {
  id: number;
  name: string;
  coverImageUrl: string;
  rating: number;
  description: string;
}

export default function ThirdScreen() {
  const route = useRoute();
  const { restaurant } = route.params as { restaurant: Restaurant };

  const [fontsLoaded] = useFonts({
    'Poppins Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
      <View style={styles.container}>
        <Image source={{ uri: restaurant.coverImageUrl }} style={styles.image} />
        <Text style={styles.title}>{restaurant.name}</Text>

        <Text style={styles.byline}>Sobre o restaurante</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  image: {
    width: '100%',
    height: 361,
    flexShrink: 0,
    borderRadius: 20,
  },
  title: {
    position: 'absolute',
    width: 221,
    height: 64,
    top: 257,
    left: 19,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 32,
    fontStyle: 'normal',
    lineHeight: 32,
    color: '#FFFFFF',
  },
  byline: {
    position: 'absolute',
    width: 204,
    height: 26,
    top: 391,
    left: 16,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 20,
    fontStyle: 'normal',
    lineHeight: 26,
    color: '#FFFFFF',
  },
  description: {
    position: 'absolute',
    width: 358,
    height: 54,
    top: 432,
    left: 16,
    fontFamily: 'Poppins Regular',
    fontWeight: '400',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 18,
    color: '#FFFFFF',
  }
});
