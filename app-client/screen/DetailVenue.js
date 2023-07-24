// import { Text } from "react-native";
// const DetailVenue = () => {
//   return <Text> Ini detail Venue </Text>;
// };

// export default DetailVenue;

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const VenueDetailScreen = ({ route }) => {
  // const { name, description, image, location, capacity, facility, rating, price, type, portofolio } = route.params;

  const venue = {
    id: 1,
    name: "The Valley",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image:
      "https://images.summitmedia-digital.com/preview/images/2019/04/26/cebu-wedding-venue-nm.jpg",
    location: "Jakarta",
    capacity: 500,
    facility: ["Stage, Ballroom, Parking Car"],
    rating: 4.8,
    price: 25000000,
    type: "Ballroom",
    portofolio: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      "https://images.unsplash.com/photo-1620735692151-26a7e0748429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      "https://images.unsplash.com/photo-1625619080917-7d6ff39e0675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://plus.unsplash.com/premium_photo-1664790560217-f9d1b375b7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    ],
    googleMapsLocation: {
      latitude: -6.2088,
      longitude: 106.8456,
    },
  };
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const mapHeight = windowHeight * 0.3;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{venue.name}</Text>
        <Text style={styles.description}>{venue.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#555555" />
            <Text style={styles.detailText}>{venue.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="people" size={20} color="#555555" />
            <Text style={styles.detailText}>Capacity: {venue.capacity}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="room-service" size={20} color="#555555" />
            <Text style={styles.detailText}>
              Facilities: {venue.facility.join(", ")}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="star" size={20} color="#555555" />
            <Text style={styles.detailText}>Rating: {venue.rating}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color="#555555" />
            <Text style={styles.detailText}>
              Price: Start from Rp.{venue.price}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="category" size={20} color="#555555" />
            <Text style={styles.detailText}>Type: {venue.type}</Text>
          </View>
        </View>

        <Text style={styles.portofolioTitle}>Portfolio Image:</Text>
        <ScrollView horizontal>
          {venue.portofolio.map((portfolioImage, index) => (
            <Image
              key={index}
              source={{ uri: portfolioImage }}
              style={styles.portfolioImage}
            />
          ))}
        </ScrollView>
        {/* <MapView
          style={{ width: "100%", height: 200 }}
          initialRegion={{
            latitude: venue.googleMapsLocation.latitude,
            longitude: venue.googleMapsLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: venue.googleMapsLocation.latitude,
              longitude: venue.googleMapsLocation.longitude,
            }}
            title={venue.name}
          />
        </MapView> */}

        <Text style={styles.portofolioTitle}>Google Maps:</Text>
      </View>
      <MapView
        style={{ width: windowWidth, height: mapHeight, paddingRight: 20 }}
        initialRegion={{
          latitude: venue.googleMapsLocation.latitude,
          longitude: venue.googleMapsLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: venue.googleMapsLocation.latitude,
            longitude: venue.googleMapsLocation.longitude,
          }}
          title={venue.name}
        />
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
  },
  portofolioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  portfolioImage: {
    width: 200,
    height: 150,
    marginRight: 10,
  },
});

export default VenueDetailScreen;
