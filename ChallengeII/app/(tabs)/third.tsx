import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface Restaurant {
  id: number;
  name: string;
  coverImageUrl: string;
  rating: number;
  description: string;
  menu: MenuItem[];
}

interface MenuItem {
  title: string;
  imageUrl: string;
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

  const renderStars = (rating: number) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <View key={i} style={styles.starContainer}>
          <FontAwesome
            name={i + 0.5 <= rating ? 'star' : 'star-o'}
            size={20}
            color={i + 0.5 <= rating ? '#FFBF00' : '#FFF'}
          />
        </View>
      );
    }
    return (
      <View style={styles.starRatingContainer}>
        {starIcons}
      </View>
    );
  };

  const menuItems: MenuItem[] = restaurant.menu;

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.coverImageUrl }} style={styles.image} />
      <Text style={styles.title}>{restaurant.name}</Text>
      {renderStars(restaurant.rating)}

      <Text style={styles.byline}>About the restaurant</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.menuTitle}>Menu</Text>

      <FlatList
        horizontal
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.menuItemImage} />
            <Text style={styles.menuItemTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.menuItemsContainer}
      />
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
    height: 70,
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
  },
  menuTitle: {
    position: 'absolute',
    width: 58,
    height: 26,
    top: 545,
    left: 16,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 20,
    fontStyle: 'normal',
    lineHeight: 26,
    color: '#FFFFFF',
  },
  starRatingContainer: {
    position: 'absolute',
    width: 115,
    height: 25,
    top: 325,
    left: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: 10,
  },
  menuItemContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemImage: {
    width: 170,
    height: 104,
    flexShrink: 0,
    borderRadius: 12,
  },
  menuItemTitle: {
    marginTop: 5,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  menuItemsContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
});