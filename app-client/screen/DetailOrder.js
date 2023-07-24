import React, { useState } from "react";
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
import { Calendar } from "react-native-calendars";
import { addCartData } from "../features/CartData/AddCart";
import { useDispatch, useSelector } from "react-redux";
import { format, addMonths, isBefore } from "date-fns";

const WeddingForm = ({ route, navigation }) => {
  const { cartData, eoId } = route.params;
  const [selectedDate, setSelectedDate] = useState("");
  const [groom, setGroom] = useState("");
  const [bride, setBride] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [inputError, setInputError] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  // Mengatur tanggal awal yang dapat dipilih
  const minDate = format(new Date(), "yyyy-MM-dd");

  // Mengatur tanggal akhir yang dapat dipilih (sebulan ke depan)
  const maxDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

  const handleSubmit = () => {
    if (
      groom === "" ||
      bride === "" ||
      contactNumber === "" ||
      address === ""
    ) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setShowModal(true);
  };

  const handleConfirmation = async (confirmation) => {
    setShowModal(false);

    if (confirmation === "yes") {
      // Lakukan tindakan yang diperlukan dengan data yang diisi pengguna
      const id = eoId;
      const completeData = {
        totalPrice: cartData.totalPrice,
        pax: cartData.pax,
        groom: groom,
        bride: bride,
        address: address,
        contactNumber: contactNumber,
        weddingDate: selectedDate,
      };
      console.log("Data Form:", { selectedDate, groom, bride, contactNumber });

      await dispatch(addCartData({ data: completeData, idProduct: id }));
      Alert.alert(
        "Success",
        "The product has been added to the cart successfully."
      );
      // Navigasi ke halaman berikutnya
      navigation.navigate("Cart");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Input detail information for this order</Text>

      <Text style={styles.label}>Tanggal:</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
        minDate={maxDate}
        // maxDate={maxDate}
        disableArrowLeft={false}
        disableArrowRight={false}
        theme={{
          arrowColor: "#007AFF",
          selectedDayBackgroundColor: "#007AFF",
          selectedDayTextColor: "#ffffff",
        }}
      />

      <Text style={styles.label}>Nama Pengantin Pria:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Pengantin Pria"
        value={groom}
        onChangeText={(text) => setGroom(text)}
      />

      <Text style={styles.label}>Nama Pengantin Wanita:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Pengantin Wanita"
        value={bride}
        onChangeText={(text) => setBride(text)}
      />

      <Text style={styles.label}>Nomor Kontak:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nomor Kontak"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Alamat Lengkap"
        value={address}
        onChangeText={(text) => setAddress(text)}
        // keyboardType="phone-pad"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
});

export default WeddingForm;
