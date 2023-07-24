import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";

import SelectPhotoCard from "../../components/filterComponents/SelectPhotoCard.js";

import { useDispatch, useSelector } from "react-redux";

import { fetchPhotographData } from "../../features/PhotographData/photographSlice.js";
import { Dropdown } from "react-native-element-dropdown";

const PhotoSelectPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const photographStateData = useSelector((state) => state.photograph.data);
  const status = useSelector((state) => state.photograph.status);
  const error = useSelector((state) => state.photograph.error);

  const budgetData = useSelector((state) => state.inputDateBudget.budget);

  //   Search
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  //
  //   Price
  const [valuePrice, setValuePrice] = useState(null);
  const [isFocusPrice, setIsFocusPrice] = useState(false);

  //   console.log(budgetData, searchQuery, "di select photo"); // Display the budget value

  useEffect(() => {
    dispatch(
      fetchPhotographData({
        belowPrice: budgetData,
        search: searchQuery,
        price: valuePrice,
      })
    );
  }, [dispatch, searchQuery, valuePrice]);
  //

  //

  const Price = [
    { label: "All", value: null },
    { label: "Lowest Price", value: "lowest" },
    { label: "Highest Price", value: "higest" },
  ];
  const renderPriceDropdown = (text, dataDrop) => (
    <Dropdown
      style={[styles.dropdown, isFocusPrice && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={dataDrop}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={`${text}`}
      // placeholder={!isFocus ? `${text}` : "..."}
      searchPlaceholder="Search..."
      value={valuePrice}
      onFocus={() => setIsFocusPrice(true)}
      onBlur={() => setIsFocusPrice(false)}
      onChange={(item) => {
        console.log(item);
        setValuePrice(item.value);
        setIsFocusPrice(false);
      }}
    />
  );

  return (
    //  <ScrollView>
    <View style={styles.screen}>
      <Searchbar
        placeholder="Search Photographer"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchStyle}
      />

      <View style={styles.dropdownContainer}>
        {renderPriceDropdown("Price", Price)}
      </View>

      {status === "loading" ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : status === "failed" ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={photographStateData}
          renderItem={({ item }) => (
            <SelectPhotoCard data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
    //  </ScrollView>
  );
};

export default PhotoSelectPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  searchStyle: {
    //  marginBottom: 7,
    backgroundColor: "#dff1f5",
  },
  containerButton: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
  //
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 1,
    marginTop: 10,
    marginBottom: 4,
  },
  dropdown: {
    flex: 1,
    height: 35,
    //  borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  //
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

{
  /* <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={previousButton}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View> */
}

// const nextButton = () => {
//     navigation.navigate("CateringSelect");
//   };
//   const previousButton = () => {
//     navigation.navigate("BuildingSelect");
//   };
