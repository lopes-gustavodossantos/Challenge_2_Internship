import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Restaurant {
  id: number;
  coverImageUrl: string;
  name: string;
}

export default function SecondScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Poppins Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }: { item: Restaurant }) => (
    <Pressable onPress={() => navigation.navigate('three', { restaurant: item })}>
      <View style={styles.card}>
        <Image source={{ uri: item.coverImageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </Pressable>
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
  header: {
    width: '100%',
    height: 98,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
  },
  headerText: {
    fontFamily: 'Poppins Regular',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120, 
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
