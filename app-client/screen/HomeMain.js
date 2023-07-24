import {Provider, useSelector} from "react-redux";
// Import React and React Native
import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import FilterScreen from "../components/FilterScreen";
import ChatScreen from "../components/ChatScreen";
import LoginRegister from "./LoginRegister";
import HomeStack from "./HomeStack";
import CartScreen from "../components/CartScreen.js";
import {shadow} from "react-native-paper";
import ProfileScreen from "./ProfileScreen.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00bce1",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="options" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeMain = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const {access_token} = useSelector((state) => state.users);

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem("access_token");
        setHasAccessToken(storedAccessToken !== null);
      } catch (error) {
        console.log("Error checking access token:", error);
        setHasAccessToken(false);
      }
    };

    checkAccessToken();
  }, [access_token]);
  return (
    <NavigationContainer>
      {hasAccessToken ? <TabNavigator /> : <LoginRegister />}
    </NavigationContainer>
  );
};

export default HomeMain;
