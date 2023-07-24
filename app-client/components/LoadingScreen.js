import React from "react";
import {View, Image, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const LoadingScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../assets/wego.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1, // Memastikan gambar tidak terdistorsi
    marginBottom: 8,
  },
});
