import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomePage from "./pages/homePage";
import GS from "./styles/globalStyles";

export default function App() {
  return (
    <View style={[styles.container, { backgroundColor: GS.colors.background }]}>
      <StatusBar style="auto" />
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
