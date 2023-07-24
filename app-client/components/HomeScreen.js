// Import React and React Native components
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ViewPropTypes,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import Icon from "react-native-vector-icons/Ionicons";
import DetailVenue from "../screen/DetailVenue";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};
// import SelectCateringCard from "../../components/filterComponents/SelectCateringCard.js";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsData } from "../features/PackageData/packageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productStateData = useSelector((state) => state.product.data);
  // console.log(productStateData);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        setAccessToken(token);
        console.log(token);
      } catch (error) {
        console.log("Error getting access token:", error);
      }
    };

    getAccessToken();
    dispatch(fetchProductsData());
    // console.log(fetchProductsData);
  }, [dispatch]);

  // const [product, setProduct] = useState([]);

  // const getProduct = async () => {
  //   try {
  //     const { data } = await axios({
  //       method: "GET",
  //       url: `https://c9d4-103-138-68-174.ngrok-free.app/products`,
  //     });
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error, "==>>>>>>>>>>>>>>>");
  //   }
  // };

  const { navigate } = useNavigation();
  const handlePressVenue = () => {
    navigate("DetailVenue");
  };
  const handlePressFotografer = () => {
    navigate("DetailFotografer");
  };
  const handlePressEO = (id) => {
    navigate("DetailEventOrganizer", { eoId: id });
  };
  // useEffect(() => {
  //   getProduct();
  // }, []);
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {/* <Text> {JSON.stringify(product)}</Text> */}
      <Text style={styles.title}>Weddingku</Text>
      <Text style={styles.promo}>
        Book now discount <Text style={styles.promoDiscount}>5%</Text>
      </Text>

      <Text style={styles.subtitle}>Available Package</Text>
      <FlatList
        data={productStateData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Set number of columns to 2
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePressEO(item.id)}
            style={styles.card}
          >
            <Image source={{ uri: item?.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item?.title}</Text>
              <View style={styles.cardInfo}>
                <Ionicons name="location-outline" size={16} color="#00bce1" />
                <Text style={styles.cardInfoText}>{item?.Venue.location}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Ionicons name="people-outline" size={16} color="#00bce1" />
                <Text
                  style={styles.cardInfoText}
                >{`${item?.Venue.capacity} people`}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Ionicons name="pricetag-outline" size={16} color="#00bce1" />
                <Text style={styles.cardInfoText}>
                  {formatCurrency(item?.Venue.price + item?.price)}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.cardInfoText}>{item?.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const FilterScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Filter</Text>
    {/* Add filter options */}
  </View>
);

const CartScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Cart</Text>
    {/* Add cart items */}
  </View>
);

const ChatScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Chat</Text>
    {/* Add chat messages */}
  </View>
);

// Define the styles
const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bce1",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase", // Convert text to uppercase
  },
  promo: {
    fontSize: 18,
    color: "#00bce1",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  promoDiscount: {
    fontSize: 18,
    color: "#ff0000",
    fontWeight: "bold",
  },
  cardList: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    flex: 0.5, // Set flex to 0.5 for 2 cards per row
    aspectRatio: 0.6, // Maintain aspect ratio of card
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardVenue: {
    flex: 0.5, // Set flex to 0.5 for 2 cards per row
    aspectRatio: 0.7, // Maintain aspect ratio of card
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    // marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "50%",
    marginBottom: 10,
    borderRadius: 5,
  },
  cardContent: {
    padding: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  cardInfoText: {
    marginLeft: 4,
    // color: "#fff",
  },
  photographerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  photographerItem: {
    alignItems: "center",
    margin: 10,
  },
  photographerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  photographerName: {
    fontSize: 14,
    textAlign: "center",
    color: "red",
  },
  successStoryItem: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  successStoryImage: {
    width: "100%",
    height: "100%",
  },
  successStoryCaption: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  successStoryCaptionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 12,
    color: "#777",
  },
});
export default HomeScreen;
