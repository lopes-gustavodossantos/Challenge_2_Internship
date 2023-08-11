import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";

export default function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev"
        );
        setRestaurants(response.data.body.restaurants);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurantes</Text>
      </View>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
}

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
  },
});
