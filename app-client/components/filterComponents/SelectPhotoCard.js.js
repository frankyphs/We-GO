import React, { useState } from "react";
import {
  Image,
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

import { setPhotographerId } from "../../features/inputDateBudget/dateBudgetSlice";

const SelectPhotoCard = ({ data, navigation }) => {
  const dispatch = useDispatch();

  const nextButton = () => {
    dispatch(setPhotographerId(data));

    navigation.navigate("CateringSelect");
  };

  const slicedDescription = data?.description?.slice(0, 40);

  //   Modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  //   console.log(data.photo);
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={styles.modalTitle}>{data?.name}</Text>
          <Text style={styles.modalDescription}>{data?.description}</Text>
        </Modal>
      </Portal>
      <View style={styles.vendorCard}>
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={50}
              source={{
                uri: "https://areatopik.com/wp-content/uploads/2022/10/Kobo-Nangis.jpg",
              }}
              style={{ marginTop: 5 }}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.vendorCardTextHead}>{data?.name}</Text>
            <Text>{slicedDescription}...</Text>
            {/*  */}
            <TouchableOpacity style={styles.showMoreButton} onPress={showModal}>
              <Text style={styles.showMoreButtonText}>Show More</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Second Row */}
        <View style={styles.row}>
          <ScrollView horizontal>
            <View style={styles.imageListVendor}>
              {data?.photo &&
                data.photo.map((photo, index) => (
                  <Image
                    key={index}
                    style={styles.imageListVendorBackground}
                    source={{
                      uri: photo,
                    }}
                  />
                ))}
            </View>
          </ScrollView>
        </View>

        {/* Third Row */}
        <View style={styles.rowAction}>
          <View style={styles.rowText}>
            <Text style={styles.cardPrice}>
              IDR {Number(data.price).toLocaleString()}
            </Text>
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              console.log("Add to Cart");
              nextButton();
            }}
          >
            Add to Cart
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

export default SelectPhotoCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    marginBottom: 10,
  },
  rowAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  rowText: {
    flexDirection: "column",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  avatarContainer: {
    marginRight: 15,
    marginLeft: 10,
  },
  column: {
    flexDirection: "column",
    flex: 1,
  },
  button: {
    width: 120, // Adjust the width to your preference
    height: 40, // Adjust the height to your preference
    backgroundColor: "#00bce1",
  },
  vendorCard: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingTop: 10,
    elevation: 2, // Add elevation to create shadow effect
  },
  vendorCardTextHead: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#147dd9",
    marginBottom: 5,
  },
  imageListVendor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageListVendorBackground: {
    width: 250, // Adjust the desired width
    height: 200, // Adjust the desired height
    marginRight: 2, // Add some spacing between images
    borderRadius: 3,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  // Modal
  showMoreButton: {
    marginTop: -2,
    marginBottom: 8,
    marginLeft: 0,
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
});
