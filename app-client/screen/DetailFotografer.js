import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const photographers = {
  id: 1,
  name: "Hifzul",
  image:
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=858&q=80",
  domisili: "Bandung",
  portofolio: [
    {
      judul: "Wedding Photoshoot",
      deskripsi: "Memorable moments captured during weddings",
      gambar:
        "https://plus.unsplash.com/premium_photo-1661281280766-8b39804dfa77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      judul: "Portrait Photography",
      deskripsi: "Capturing beautiful portraits of individuals",
      gambar:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      judul: "Portrait Photography",
      deskripsi: "Capturing beautiful portraits of individuals",
      gambar:
        "https://plus.unsplash.com/premium_photo-1675107358573-e059060d7006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
  ],
};

const FotograferDetail = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: photographers.image }}
          />
        </View>
        <Text style={styles.name}>{photographers.name}</Text>
        <Text style={styles.location}>{photographers.domisili}</Text>
        <Text style={styles.sectionTitle}>Portofolio:</Text>
        {photographers.portofolio.map((item, index) => (
          <View key={index} style={styles.portofolioItem}>
            <Image
              style={styles.portofolioImage}
              source={{ uri: item.gambar }}
            />
            <Text style={styles.portofolioTitle}>{item.judul}</Text>
            <Text style={styles.portofolioDescription}>{item.deskripsi}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  portofolioItem: {
    marginBottom: 16,
  },
  portofolioImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  portofolioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  portofolioDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default FotograferDetail;
