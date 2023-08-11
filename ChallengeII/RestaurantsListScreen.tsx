import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RestaurantsListScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
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

  const navigateToDetail = restaurant => {
    navigation.navigate('RestaurantDetailScreen', { restaurant });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurantes</Text>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigateToDetail(item)}>
            <View>
              <Image source={{ uri: item.coverImageUrl }} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.darkOverlay}></View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
            </View>
            <FlatList
              data={item.menu}
              keyExtractor={(menuItem, index) => `${item.id}-${index}`}
              horizontal
              renderItem={({ item: menuItem }) => (
                <Image source={{ uri: menuItem.imageUrl }} style={styles.menuItemImage} />
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
  },
  header: {
    width: '100%',
    height: 98,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 32,
  },
  card: {
    width: 370,
    height: 150,
    flexShrink: 0,
    marginVertical: 10,
    marginHorizontal: 22,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardTitle: {
    color: '#FFF',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    elevation: 5,
    bottom: 1,
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default RestaurantsListScreen;
