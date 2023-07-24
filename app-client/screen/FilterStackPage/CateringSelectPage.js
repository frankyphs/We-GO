import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";

import SelectCateringCard from "../../components/filterComponents/SelectCateringCard.js";
import { useDispatch, useSelector } from "react-redux";

import { fetchCatheringsData } from "../../features/CateringData/cateringSlice.js";
import { Dropdown } from "react-native-element-dropdown";

const CateringSelectPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const cateringStateData = useSelector((state) => state.catering.data);
  const status = useSelector((state) => state.catering.status);
  const error = useSelector((state) => state.catering.error);

  const budgetData = useSelector((state) => state.inputDateBudget.budget);

  //   Search
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  //   Price
  const [valuePrice, setValuePrice] = useState(null);
  const [isFocusPrice, setIsFocusPrice] = useState(false);

  useEffect(() => {
    dispatch(
      fetchCatheringsData({
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
        placeholder="Search Catering"
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
          data={cateringStateData}
          renderItem={({ item }) => (
            <SelectCateringCard data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item?.id}
        ></FlatList>
      )}
    </View>
    //  </ScrollView>
  );
};

export default CateringSelectPage;

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
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
  /* <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            {SelectCateringCard(data)}
            {SelectCateringCard(data)}
          </View>
          <View style={styles.cardRow}>
            {SelectCateringCard(data)}
            {SelectCateringCard(data)}
          </View>
          <View style={styles.cardRow}>
            {SelectCateringCard(data)}
            {SelectCateringCard(data)}
          </View>
        </View> */
}

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

//
//   const nextButton = () => {
//    navigation.navigate("MenuPaxSelect");
//  };
//  const previousButton = () => {
//    navigation.navigate("PhotoSelect");
//  };
