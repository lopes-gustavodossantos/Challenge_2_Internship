import { useFonts } from 'expo-font';
import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
type FontAwesomeIconName = "key" | "star-o" | "filter";

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
  const navigation = useNavigation();
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
      let iconName = 'star-o';
      if (i < Math.floor(rating)) {
        iconName = 'star';
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        iconName = 'star-half-o';
      }
      
      starIcons.push(
        <View key={i} style={styles.starContainer}>
          <FontAwesome
            name={iconName as FontAwesomeIconName}
            size={20}
            color={i + 0.5 <= rating ? '#FFBF00' : '#FFBF00'}
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
      <Image source={{ uri: restaurant.coverImageUrl }} style={styles.image}/>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('second' as never)}>
        <Image source={require('../../assets/images/back_arrow.png')}/>
      </TouchableOpacity>
      
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
    
      <View style={styles.menuCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.menuItemImage}/>
        
          <Text style={styles.menuItemTitle}>{item.title}</Text>
        
      </View>
    
  )}
  contentContainerStyle={styles.menuItemsContainer}
  showsHorizontalScrollIndicator={false}
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
  backButton: {
    position: 'absolute',
    width: 20,
    height: 30,
    top: 45,
    left: 19,
    flexShrink: 0,
    tintColor: '#FFFFFF',
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
  menuCard: {
    width: 170,
    height: 164,
    top: 230,
    flexShrink: 0,
    marginLeft: 16,
    borderRadius: 12,
    backgroundColor: '#4F4F54',
  },
  menuItemImage: {
    width: '100%',
    height: 104,
    flexShrink: 0,
    borderRadius: 12,
  },
  menuItemTitle: {
    top: 10,
    left: 10,
    fontFamily: 'Poppins Regular',
    fontWeight: '700',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 16,
    color: '#FFFFFF',
  },
  menuItemsContainer: {
    paddingHorizontal: 0,
    paddingRight: 16,
  },
});