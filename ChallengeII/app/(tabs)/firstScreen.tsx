import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FirstScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Bebas Neue": require("../../assets/fonts/BebasNeue-Regular.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background_initial_screen.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.overlay}></View>
        <Text style={styles.title}>FIND D BEST</Text>
        <Text style={styles.byline}>Restaurant</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("secoundScreen" as never)}
        >
          <Text style={styles.buttontext}>Access</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: 260,
    top: 100,
    left: 65,
    fontFamily: "Bebas Neue",
    fontWeight: "400",
    fontSize: 72,
    fontStyle: "normal",
    lineHeight: 72,
    textAlign: "center",
    color: "#FFFFFF",
  },
  byline: {
    width: 132,
    top: 100,
    left: 125,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    width: 350,
    height: 50,
    marginTop: 670,
    left: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E73030",
  },
  buttontext: {
    width: 400,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      "rgba(0, 0, linear-gradient(180deg, #090808 1%, rgba(0, 0, 0, 0.35) 99.44%);",
  },
});
