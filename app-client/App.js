import {store} from "./stores/store";
import {Provider, useSelector} from "react-redux";
// Import React and React Native components
import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import FilterScreen from "./components/FilterScreen";
import ChatScreen from "./components/ChatScreen";
import LoginRegister from "./screen/LoginRegister";
import HomeStack from "./screen/HomeStack";
import CartScreen from "./components/CartScreen.js";
import {shadow} from "react-native-paper";
import ProfileScreen from "./screen/ProfileScreen.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeMain from "./screen/HomeMain.js";
import {LoadingScreen} from "./components/LoadingScreen";
import {SafeAreaView, View, StyleSheet} from "react-native";

// Create a bottom tab navigator

const App = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <LoadingScreen />
        </NavigationContainer>
      </View>
    );
  }
  return (
    <Provider store={store}>
      <HomeMain />
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
