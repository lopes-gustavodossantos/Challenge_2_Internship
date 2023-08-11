import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MenuItemCard = ({ menuItem }) => {
  return (
    <View style={styles.menuItemCard}>
      <Image source={{ uri: menuItem.imageUrl }} style={styles.menuItemImage} />
      <View style={styles.menuItemTitleContainer}>
        <Text style={styles.menuItemTitle}>{menuItem.title}</Text>
      </View>
    </View>
  );
};

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const renderStars = rating => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <View key={i} style={styles.starContainer}>
          <FontAwesome
            name={i < rating ? 'star' : 'star-o'}
            size={20}
            color={i < rating ? '#FFD700' : '#FFF'}
          />
        </View>
      );
    }
    return starIcons;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={22} color="white" />
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <Image source={{ uri: restaurant.coverImageUrl }} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardShadow}></View>
        <View style={styles.cardBackground}></View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{restaurant.name}</Text>
          <View style={styles.starRatingContainer}>
            {renderStars(restaurant.rating)}
          </View>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Sobre o Restaurante</Text>
        <Text style={styles.cardDescription}>{restaurant.description}</Text>
      </View>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <ScrollView horizontal style={styles.menuItemsContainer}>
        {restaurant.menu.map((menuItem, index) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  cardContainer: {
    width: 414,
    height: 361,
    position: 'relative',
  },
  cardShadow: {
    width: 414,
    height: 361,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: 414,
    height: 361,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 20,
  },
  cardBackground: {
    width: 414,
    height: 361,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTitle: {
    color: '#FFF',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32,
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starContainer: {
    marginRight: 10,
  },
  descriptionContainer: {
    padding: 20,
  },
  descriptionTitle: {
    color: '#FFF',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardDescription: {
    color: '#FFF',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
  },
  menuTitleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  menuTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    fontWeight: '700',
    lineHeight: 26,
  },
  menuItemsContainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  menuItemCard: {
    width: 170,
    height: 164,
    backgroundColor: '#4F4F54',
    borderRadius: 12,
    marginRight: 10,
  },
  menuItemImage: {
    width: 170,
    height: 104,
    borderRadius: 12,
  },
  menuItemTitleContainer: {
    marginTop: 8,
    marginLeft: 8,
  },
  menuItemTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default RestaurantDetailScreen;
