import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  PaperProvider,
} from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import { setCateringId } from "../../features/inputDateBudget/dateBudgetSlice";

const SelectCateringCard = ({ data, navigation }) => {
  const dispatch = useDispatch();

  const nextButton = () => {
    dispatch(setCateringId(data));

    navigation.navigate("MenuPaxSelect");
  };

  const slicedDescription = data?.description?.slice(0, 500);

  //   Modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  //
  const formattedDescription = data?.description.replace(/\/n/g, "\n");
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={styles.modalTitle}>{data?.name}</Text>
          <Text style={styles.modalDescription}>{formattedDescription}</Text>
        </Modal>
      </Portal>
      {/*  */}
      <Card style={styles.cardStyle}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: data?.imageUrl }}
            style={styles.imageBackground}
          ></ImageBackground>
        </View>

        {/*  */}
        <Card.Title
          title={data?.name}
          subtitle={slicedDescription}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
        {/*  */}
        <TouchableOpacity style={styles.showMoreButton} onPress={showModal}>
          <Text style={styles.showMoreButtonText}>Show More</Text>
        </TouchableOpacity>
        {/*  */}
        <Card.Content style={styles.cardContent}>
          <View style={styles.rowContainer}>
            <Text style={styles.cardPrice}>
              IDR {Number(data?.price).toLocaleString()} /Pax
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                console.log("Add to Cart");
                nextButton();
              }}
              style={{ backgroundColor: "#00bce1" }}
            >
              Add to Cart
            </Button>
          </View>
        </Card.Content>
      </Card>
      {/*  */}
      {/* <View style={styles.vendorCard}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={50}
            source={{
              uri: data?.imageUrl,
            }}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.vendorCardTextHead}>{data?.name}</Text>
          <Text style={styles.vendorCardTextSubtitle}>{slicedDescription}</Text>
        </View> */}

      {/* Second Row */}
      {/* <View style={styles.row}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.imageListVendor}>
              <Image
                style={styles.imageListVendorBackground}
                source={{
                  uri: data?.imageUrl,
                }}
              />
            </View>
          </ScrollView>
        </View> */}

      {/* Third Row */}
      {/* <View style={styles.priceContainer}>
          <Text style={styles.priceText}>IDR {data?.price}</Text>
          <Text>per @Pax</Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              console.log("Add to Cart");
              nextButton();
            }}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonText}
          >
            Add to Cart
          </Button>
        </View>
      </View> */}
    </PaperProvider>
  );
};

export default SelectCateringCard;

const styles = StyleSheet.create({
  vendorCard: {
    borderWidth: 0.5,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 3,
    marginHorizontal: 3,
    padding: 10,
    maxWidth: "50%",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 10,
  },
  vendorCardTextHead: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#147dd9",
  },
  vendorCardTextSubtitle: {
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageListVendor: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageListVendorBackground: {
    width: 100,
    height: 100,
    marginRight: 2,
    borderRadius: 3,
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: 130,
    height: 35,
    alignSelf: "flex-start",
  },
  buttonContent: {
    height: 40,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  //
  cardStyle: {
    marginVertical: 5,
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 2,
    marginBottom: 5,
  },
  //   Location
  locationContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: "white",
    fontSize: 12,
  },
  //
  imageContainer: {
    overflow: "hidden", // Ensure the rounded corners are displayed properly
    borderRadius: 8, // Add borderRadius to round the edges
  },
  imageBackground: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // Modal
  showMoreButton: {
    marginTop: -13,
    marginBottom: 10,
    marginLeft: 17,
    alignSelf: "flex-start",
  },
  showMoreButtonText: {
    fontSize: 14,
    color: "#3174cc",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 12,
    marginBottom: 5,
  },
  //
});
