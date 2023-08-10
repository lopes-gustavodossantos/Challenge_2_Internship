import React from "react-native";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

//Array Cards
const data = [
  {
    id: "1",
    title: "Sushi House",
    image: require("./assets/images/sushiHouse.jpeg"),
  },
  {
    id: "2",
    title: "The Raven \n Restaurant",
    image: require("./assets/images/ravenRestaurant.jpeg"),
  },
  {
    id: "3",
    title: "Churrascaria \n Barranco",
    image: require("./assets/images/churracariaBarranco.jpeg"),
  },
  {
    id: "4",
    title: "Black Burger",
    image: require("./assets/images/blackBurguer.jpeg"),
  },
];

const Card = ({ title, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.cardImage} />
    <View style={styles.overlay} />
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurantes</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card title={item.title} image={item.image} />
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //Screen
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

  //FlatList
  flatList: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  //Card
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

  //Background Color Image
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
  },

  //Card
  cardTitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default App;
