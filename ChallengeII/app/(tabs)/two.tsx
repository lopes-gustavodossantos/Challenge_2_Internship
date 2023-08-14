<<<<<<< Updated upstream
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

type Restaurant = {
  id: number;
  name: string;
  coverImageUrl: string;
};
=======
import React from "react";
import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
>>>>>>> Stashed changes

export default function TabOneScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
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
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev"
        );
        setRestaurants(response.data.body.restaurants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const renderRestaurant = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.coverImageUrl }} style={styles.cardImage} />
      <View style={styles.overlay}></View>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
<<<<<<< Updated upstream
        <Text style={styles.headerTitle}>Restaurantes</Text>
      </View>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
=======
        <Text style={styles.headerText}>Restaurantes</Text>
      </View>
      <View style={styles.content}>{}</View>
>>>>>>> Stashed changes
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2E",
  },
  //Header
  header: {
    width: 414,
    height: 100,
    flexShrink: 0,
<<<<<<< Updated upstream
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
  },
  headerTitle: {
    marginTop: 35,
    fontSize: 20,
    right: 8,
    fontWeight: "bold",
    color: "white",
  },
  // Flatlist
  flatList: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  // Cards
  card: {
    width: 340,
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  cardTitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  //Color Image
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
=======
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1C1E",
  },
  headerText: {
    width: 126,
    height: 32,
    top: 5,
    fontFamily: "Poppins Regular",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 32,
    textAlign: "center",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
>>>>>>> Stashed changes
  },
});
