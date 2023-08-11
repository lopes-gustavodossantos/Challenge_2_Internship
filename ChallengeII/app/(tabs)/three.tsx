import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native'; // Added Image
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Restaurant {
    id: number;
    name: string;
    coverImageUrl: string;
    description: string;
    rating: number;
    menu: string;
}

export default function TabOneScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Poppins Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      
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

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.card}>
        <Image source={{ uri: item.coverImageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardTitle}>{item.rating}</Text>
    </View>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, 
  },
  card: {
    width: 370,
    height: 150,
    top: 30,
    flexShrink: 0,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  cardTitle: {
    position: 'absolute',
    width: 220,
    height: 'auto',
    left: 19,
    bottom: 15,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 32,
    fontStyle: 'normal',
    lineHeight: 32,
    color: '#FFFFFF',
  },
});
