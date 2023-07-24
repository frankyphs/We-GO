import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function LoginPage() {
  return (
    // <SafeAreaView>
    <ScrollView style={styles.sectionContainer}>
      <ImageBackground
        source={{}}
        style={{
          width: "100%",
          height: 300,
          resizeMode: "center",
          backgroundColor: "#00bce1",
        }}
      >
        <View style={styles.header}>
          <View style={styles.logo}></View>
          <Text style={styles.title}>Login Admin</Text>
          <Text style={styles.subtitle}>
            Log in and autocomplete your order with your personal data
          </Text>
        </View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} style={styles.backButton} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.form}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter email ..."
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password ..."
              secureTextEntry
              required
            />
            <TouchableOpacity style={styles.button}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 8,
  },
  backButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
  },
  heartIcon: {
    color: "white",
    width: 40,
    height: 40,
    textAlign: "center",
    paddingTop: 8,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 16,
    zIndex: 2,
    elevation: 2,
    marginTop: -32,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "white",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  sectionPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 4,
  },
  reviewText: {
    marginLeft: 4,
  },
  authorText: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },
  image: {
    borderRadius: 16,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    padding: 5,
    margin: 5,
  },
  logo: {
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
  },
  subtitle: {
    alignSelf: "center",
    borderBottomWidth: 1,
  },
  form: {},
  input: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginPage;
