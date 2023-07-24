import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from "react-native";

// import { TextInput } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import { addCustomCartData } from "../../features/CartData/AddCustomerCart";

// title,PhotographyId, CatheringId, VenueId,  totalPrice, pax,  groom,  bride, weddingDate,
const MenuUserDetailFilterPage = ({ navigation }) => {
  const [groomData, setGroomData] = useState("");
  const [brideData, setBrideData] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressData, setAddressData] = useState("");
  const [data5, setData5] = useState("");
  //
  const [inputError, setInputError] = useState(false);

  const dispatch = useDispatch();

  const budgetData = useSelector((state) => state.inputDateBudget.budget);
  const dateData = useSelector((state) => state.inputDateBudget.date);
  const venueData = useSelector((state) => state.inputDateBudget.venueId);
  const photographerData = useSelector(
    (state) => state.inputDateBudget.photographerId
  );
  const cateringData = useSelector((state) => state.inputDateBudget.cateringId);
  const guestPaxData = useSelector((state) => state.inputDateBudget.guestPax);

  //
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    if (
      groomData === "" ||
      brideData === "" ||
      contactNumber === "" ||
      addressData === ""
    ) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setShowModal(true);
  };

  let cateringPrice = 0; // taro di sini biar bisa dipake di calTotalPrice dan di nextButton
  const calculateTotalPrice = () => {
    const venuePrice = venueData?.price || 0;
    const photographyPrice = photographerData?.price || 0;
    cateringPrice = cateringData?.price || 0;

    const totalPrice =
      venuePrice + photographyPrice + cateringPrice * guestPaxData;
    return totalPrice;
  };

  const handleConfirmation = async (confirmation) => {
    setShowModal(false);

    //  title,PhotographyId,CatheringId,VenueId,totalPrice,pax,groom,bride,weddingDate,
    if (confirmation === "yes") {
      const completeData = {
        title: `${venueData?.name} with ${cateringData?.name} and ${photographerData?.name} for ${guestPaxData} people`,
        bride: brideData,
        groom: groomData,
        weddingDate: dateData,
        contactNumber: contactNumber,
        address: addressData,
        PhotographyId: photographerData?.id,
        CatheringId: cateringData?.id,
        VenueId: venueData?.id,
        totalPrice: calculateTotalPrice(),
        pax: guestPaxData,
        // contactNumber: contactNumber,
      };

      console.log("Data Form:", completeData);

      dispatch(addCustomCartData(completeData));

      navigation.navigate("MainFilter");

      navigation.navigate("Home");

      Alert.alert(
        "Success",
        "The product has been added to the cart successfully."
      );
      // Navigasi ke halaman berikutnya
      // navigation.navigate("Cart");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input detail information for this order</Text>

      <Text style={styles.label}>Nama Pengantin Pria:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Pengantin Pria"
        value={groomData}
        onChangeText={(text) => setGroomData(text)}
      />

      <Text style={styles.label}>Nama Pengantin Wanita:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Pengantin Wanita"
        value={brideData}
        onChangeText={(text) => setBrideData(text)}
      />

      <Text style={styles.label}>Nomor Kontak:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nomor Kontak"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Adress:</Text>
      <TextInput
        style={styles.input}
        placeholder="Adress"
        value={addressData}
        onChangeText={(text) => setAddressData(text)}
      />

      {inputError && (
        <Text style={styles.errorText}>Please fill in all fields</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Pesan</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure for this detail information?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleConfirmation("yes")}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleConfirmation("no")}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuUserDetailFilterPage;

const styles = {
  container: {
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    height: 50,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
};
