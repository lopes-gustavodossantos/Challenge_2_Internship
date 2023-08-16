import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface Restaurant {
  id: number;
  coverImageUrl: string;
  name: string;
}

export default function SecondScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurants</Text>
      </View>

      <RestaurantsListScreen navigation={navigation} />
    </View>
  );
}

const RestaurantsListScreen = ({ navigation }: { navigation: any }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev")
      .then((response) => {
        setRestaurants(response.data.body.restaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }: { item: Restaurant }) => (
    <Pressable
      onPress={() => navigation.navigate("thirdScreen", { restaurant: item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.coverImageUrl }} style={styles.cardImage} />
        <View style={styles.imageOverlay}></View>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2E",
  },
  header: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C1C1E",
  },
  headerText: {
    color: "#FFF",
    marginTop: 35,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 32,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },
  card: {
    width: 350,
    height: 140,
    flexShrink: 0,
    top: 10,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  imageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
    borderRadius: 12,
  },
  cardTitle: {
    position: "absolute",
    width: 220,
    height: "auto",
    left: 14,
    bottom: 15,
    fontWeight: "700",
    fontSize: 29,
    fontStyle: "normal",
    lineHeight: 32,
    color: "#FFFFFF",
  },
});
