import { StyleSheet, View, ImageBackground, StatusBar, Dimensions, Text } from "react-native";
import HomePage from "./pages/homePage";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import GS from "./styles/globalStyles";

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="#ffffff00" barStyle="light-content" />
      <HomePage />
      <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={styles.backgroud} />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + StatusBar.currentHeight,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    zIndex: -1,
  },
});
