import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const vendorCard = ({ item }) => (
  <View style={styles.containerFilter}>
    <Image
      source={{
        uri: "https://alexandra.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_60,c_fill,g_faces,w_560,h_280/assets/upload-GD5o4PWIb.webp",
      }}
      style={styles.imageFilter}
    />
    <View style={styles.textContainerFilter}>
      <Text style={styles.textFilter}>Your Text Goes Here</Text>
    </View>
  </View>
);

export default vendorCard;

const styles = StyleSheet.create({
  containerFilter: {
    width: 100, // Adjust the width as per your requirement
    height: 150, // Adjust the height as per your requirement
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    marginBottom: 10,
  },
  imageFilter: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainerFilter: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
  },
  textFilter: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 2,
  },
});
