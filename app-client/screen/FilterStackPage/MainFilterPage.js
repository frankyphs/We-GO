import { useEffect, useState } from "react";
import {
  Text,
  View,
  Animated,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

import DatePicker from "react-native-modern-datepicker";

import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import {
  setBudget,
  setDate,
} from "../../features/inputDateBudget/dateBudgetSlice";

const MainFilterPage = ({ navigation }) => {
  const dispatch = useDispatch();

  //   Input Budget
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const animatedScale = useState(new Animated.Value(1))[0];
  const handleInputFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const handleInputBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  //  Make it doesnt recognize any input that were text/string
  const handleInputChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setInputValue(cleanedText);
  };

  //   Input Book Date // default value is a month from today
  const [selectedDate, setSelectedDate] = useState(
    moment().add(1, "month").format("YYYY-MM-DD")
  );

  //
  const minSelectableDate = moment().add(1, "month").format("YYYY-MM-DD");

  // Validation
  const [inputError, setInputError] = useState(false);
  const [dateError, setDateError] = useState(false);

  //   Next Page
  const nextButton = () => {
    console.log(selectedDate, inputValue, "di main filter");
    if (inputValue === "") {
      setInputError(true);
    } else {
      setInputError(false);
    }

    if (selectedDate === "") {
      setDateError(true);
    } else {
      setDateError(false);
      const today = moment().startOf("day");
      const minSelectableDate = moment().add(1, "month").startOf("day"); // Minimum selectable date (1 month from today)
      const selected = moment(selectedDate, "YYYY-MM-DD").startOf("day");

      if (selected.isBefore(minSelectableDate)) {
        setDateError(true);
        return; // Stop execution if the date is not valid
      }

      if (!selected.isAfter(today)) {
        setDateError(true);
        return; // Stop execution if the date is not valid
      }
    }

    if (inputValue !== "" && selectedDate !== "") {
      dispatch(setBudget(inputValue));
      dispatch(setDate(selectedDate));
      navigation.navigate("BuildingSelect");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Find your ideal Wedding for your budget
        </Text>

        <View style={styles.gap} />
        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  scale: animatedScale,
                },
              ],
            },
          ]}
        >
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            keyboardType="numeric"
            placeholder="Enter estimated budget (IDR)"
            placeholderTextColor="gray"
          />
        </Animated.View>

        {/* Render Validation */}
        {inputError && (
          <Text style={styles.errorText}>Please enter a budget</Text>
        )}

        <View style={{ height: 30 }} />

        <Text style={styles.textDate}>Pick a Date</Text>

        <DatePicker
          selected={selectedDate} // Default value
          onSelectedChange={(date) => setSelectedDate(date)}
          style={[
            styles.datePicker,
            {
              borderColor: dateError ? "red" : "#ccc",
            },
          ]}
          minDate={minSelectableDate} // Set the minimum selectable date
        />

        {dateError && (
          <Text style={styles.errorText}>
            Please select a date that is after a month from today
          </Text>
        )}

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MainFilterPage;

const { width, height } = Dimensions.get("window");
const containerWidth = width * 0.8; // Set the container width to 80% of the screen width
const containerHeight = height * 0.3; // Set the container width to 80% of the screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  gap: {
    height: 10,
  },
  textDate: {
    height: 30,
  },
  inputContainer: {
    width: containerWidth,
    borderRadius: 20, // Make the border rounded
    borderWidth: 1,
    borderColor: "lightgray", // Change the border color
    backgroundColor: "#fff", // Set a different background color
    padding: 10,
    marginTop: 5,
  },
  input: {
    fontSize: 16,
  },
  containerButton: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center", // Center the button horizontally
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
