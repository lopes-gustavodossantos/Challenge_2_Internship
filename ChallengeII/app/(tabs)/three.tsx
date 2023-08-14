import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

interface Restaurant {
  id: number;
  name: string;
  coverImageUrl: string;
  rating: number;
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
        <Image source={{ uri: restaurant.coverImageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{restaurant.name}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  cardImage: {
    width: '100%',
    height: 361,
    flexShrink: 0,
    borderRadius: 20,
  },
  cardTitle: {
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
});
