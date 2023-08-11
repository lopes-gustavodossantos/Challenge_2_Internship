import * as Font from 'expo-font';

// Carregue as fontes que você deseja usar
export const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });
};
