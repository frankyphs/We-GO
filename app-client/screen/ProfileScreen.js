import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {fetchDataUser} from "../features/UserData/fetchUserSlice";
import {useNavigation} from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.fetchUser.data);
  console.log(userData, "log data");

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
    dispatch(fetchDataUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Logout berhasil");
      // navigation.navigate("StartScreen");
      // Navigasi ke layar LoginRegister setelah logout;

      // Tambahkan logika lain yang diperlukan untuk logout
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileCard}>
        <View style={styles.profileBody}>
          <View style={styles.authorImg}>
            <Image
              source={{uri: userData.imageUrl}}
              style={styles.authorImage}
            />
          </View>
          <Text style={styles.name}>{userData.username}</Text>
          <Text style={styles.intro}>Email: {userData.email}</Text>
          <Text style={styles.intro}>Nomer Telpon: {userData.phoneNumber}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  profileCard: {
    width: 400,
    height: "auto",
    textAlign: "center",
    margin: 20,
    shadowColor: "#ccc",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 18,
    marginBottom: 20,
    borderRadius: 10, // Menambahkan border radius
    elevation: 4, // Menambahkan efek elevasi
    backgroundColor: "#fff", // Mengubah latar belakang menjadi putih
  },
  profileBody: {
    padding: 20,
  },
  authorImg: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  authorImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 3, // Menambahkan lebar border
    borderColor: "#ccc", // Mengubah warna border
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10, // Menambahkan margin bawah
  },
  intro: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginVertical: 10, // Menambahkan margin vertikal
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 2, // Menambahkan lebar border
    borderColor: "red", // Mengubah warna border
  },
  logoutButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
