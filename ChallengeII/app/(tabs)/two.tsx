import React from 'react';
import { useFonts } from 'expo-font';
import { Text, View, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Restaurantes</Text>
      </View>
      <View style={styles.content}>
        {/* Your content goes here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  header: {
    width: 414,
    height: 98,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1E',
  },
  headerText: {
    width: 126,
    height: 32,
    top: 5,
    fontFamily: 'Poppins Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
