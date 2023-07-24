//
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";

//
import SelectBuildingCard from "../../components/filterComponents/SelectBuildingCard";

import { useDispatch, useSelector } from "react-redux";

import { fetchVenueData } from "../../features/VenueData/venueSlice";

const BuildingSelectPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const venueStateData = useSelector((state) => state.venue.data);
  const status = useSelector((state) => state.venue.status);
  const error = useSelector((state) => state.venue.error);

  const budgetData = useSelector((state) => state.inputDateBudget.budget);
  const dateData = useSelector((state) => state.inputDateBudget.date);

  //   console.log(budgetData, venueStateData, "di select building"); // Display the budget value

  //   Search
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  //   Location
  const [valueLoc, setValueLoc] = useState(null);
  const [isFocusLoc, setIsFocusLoc] = useState(false);

  //   Price
  const [valuePrice, setValuePrice] = useState(null);
  const [isFocusPrice, setIsFocusPrice] = useState(false);

  useEffect(() => {
    //  console.log(searchQuery, valueLoc, valuePrice, "use effect venue page");
    dispatch(
      fetchVenueData({
        search: searchQuery,
        location: valueLoc,
        price: valuePrice,
        belowPrice: budgetData,
        weddingDate: dateData,
      })
    );
  }, [dispatch, searchQuery, valueLoc, valuePrice, dateData]);

  const Location = [
    { label: "All", value: null },
    { label: "Jakarta Selatan", value: "Jakarta Selatan" },
    { label: "Jakarta Utara", value: "Jakarta Utara" },
    { label: "Jakarta Timur", value: "Jakarta Timur" },
    { label: "Jakarta Pusat", value: "Jakarta Pusat" },
  ];

  const Price = [
    { label: "All", value: null },
    { label: "Lowest Price", value: "lowest" },
    { label: "Highest Price", value: "higest" },
  ];

  const renderLocationDropdown = (text, dataDrop) => (
    <Dropdown
      style={[styles.dropdown, isFocusLoc && { borderColor: "blue" }]}
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
      value={valueLoc}
      onFocus={() => setIsFocusLoc(true)}
      onBlur={() => setIsFocusLoc(false)}
      onChange={(item) => {
        console.log(item);
        setValueLoc(item.value);
        setIsFocusLoc(false);
      }}
    />
  );

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
    <View style={styles.screen}>
      <Searchbar
        placeholder="Search Venue"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchStyle}
      />
      <View style={styles.dropdownContainer}>
        {renderLocationDropdown("Location", Location)}
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
          data={venueStateData}
          renderItem={({ item }) => (
            <SelectBuildingCard data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
  );
};

export default BuildingSelectPage;

const styles = StyleSheet.create({
  showMoreContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  //
  searchStyle: {
    //  marginBottom: 0,
    backgroundColor: "#dff1f5",
  },
  //
  cardContent: {
    paddingTop: 0,
    paddingBottom: 2,
  },
  //
  imageContainer: {
    overflow: "hidden", // Ensure the rounded corners are displayed properly
    borderRadius: 8, // Add borderRadius to round the edges
  },
  imageBackground: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  locationContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: "white",
    fontSize: 12,
  },
  //
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  tag: {
    marginRight: 4,
    backgroundColor: "#E0E0E0",
  },
  tagText: {
    fontSize: 12,
    color: "black",
  },
  //
  screen: {
    flex: 1,
    marginTop: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  button: {
    width: 80,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 4,
  },
  //   FILTER
  containerFilter: {
    width: 150, // Adjust the width as per your requirement
    height: 200, // Adjust the height as per your requirement
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  flatListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    marginVertical: 10,
  },
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
  flatListContainer: {
    marginTop: 20,
  },
  containerFilter: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    overflow: "hidden",
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
  /* <Card>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: "https://picsum.photos/700" }}
                style={styles.imageBackground}
              >
                <LocationText />
              </ImageBackground>
            </View>
            <Card.Title
              title="E1 - 2023 Three Nights Buyout Wedding"
              subtitle="by Amanjiwo Resort - Villa / Resort"
            />
            <Card.Content style={styles.cardContent}>
              <Text>IDR 350.000.000</Text>
              <Card.Actions></Card.Actions>
            </Card.Content>
          </Card> */
}

{
  /* <View>
        <Text>Tes</Text>
        <Button onPress={() => dispatch(increment())}>Increment</Button>
        <Button onPress={() => dispatch(decrement())}>Decrement</Button>

        <Button onPress={() => dispatch(incrementByAmount({}))}>
          Increment By 5
        </Button>

        <Text>{venue}</Text>
        <Text>{JSON.stringify(venueStateData)}</Text>
      </View> */
}
