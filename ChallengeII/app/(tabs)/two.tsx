import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  rating: number;
  menu: string;
}

export default function TabOneScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurantes</Text>
      </View>
      <RestaurantsListScreen navigation={navigation} />
    </View>
  );
}

const RestaurantsListScreen = ({ navigation }: { navigation: any }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev')
    
      .then(response => {
        setRestaurants(response.data.body.restaurants);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const navigateToDetail = (restaurant: Restaurant) => {
    navigation.navigate('RestaurantDetailScreen', { restaurant });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.content}>
      {restaurants.map((restaurant, index) => (
        <Pressable key={index} onPress={() => navigateToDetail(restaurant)}>
          <Text>{restaurant.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  header: {
    width: 414,
    height: 98,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
  },
  headerText: {
    width: 126,
    height: 32,
    top: 5,
    fontFamily: 'Poppins Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
