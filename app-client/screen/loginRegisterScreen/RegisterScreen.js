import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Text} from "react-native-paper";
import Background from "../../components/loginRegisterComponent/Background";
import Logo from "../../components/loginRegisterComponent/Logo";
import Header from "../../components/loginRegisterComponent/Header";
import Button from "../../components/loginRegisterComponent/Button";
import TextInput from "../../components/loginRegisterComponent/TextInput";
import BackButton from "../../components/loginRegisterComponent/BackButton";
import {theme} from "../../features/core/theme";
import {useDispatch, useSelector} from "react-redux";
import {registerData} from "../../features/RegisterData/registerSlice";
import {Alert} from "react-native";

export default function RegisterScreen({navigation}) {
  const dispatch = useDispatch();
  const {status, error} = useSelector((state) => state.register);

  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const handleChange = (name, value) => {
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    if (dataUser.email === "" || dataUser.password === "") {
      Alert.alert("Error", "Email dan password harus diisi");
      return;
    }

    await dispatch(registerData(dataUser));

    if (status === "failed") {
      Alert.alert("Register Failed", error);
    } else {
      navigation.navigate("LoginScreen");
    }
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        name="username"
        value={dataUser.username}
        onChangeText={(value) => handleChange("username", value)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        name="email"
        value={dataUser.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        name="password"
        value={dataUser.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <TextInput
        label="Phone Number"
        keyboardType="number-pad"
        returnKeyType="done"
        name="phoneNumber"
        value={dataUser.phoneNumber}
        onChangeText={(value) => handleChange("phoneNumber", value)}
      />
      <TextInput
        label="Picture"
        returnKeyType="done"
        name="imageUrl"
        value={dataUser.imageUrl}
        onChangeText={(value) => handleChange("imageUrl", value)}
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        style={{backgroundColor: "#00bce1"}}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
