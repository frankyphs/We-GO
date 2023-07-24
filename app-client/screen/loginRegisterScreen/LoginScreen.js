import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/loginRegisterComponent/Background";
import Logo from "../../components/loginRegisterComponent/Logo";
import Header from "../../components/loginRegisterComponent/Header";
import Button from "../../components/loginRegisterComponent/Button";
import TextInput from "../../components/loginRegisterComponent/TextInput";
import BackButton from "../../components/loginRegisterComponent/BackButton";
import { theme } from "../../features/core/theme";
import { useDispatch, useSelector } from "react-redux";
import { loginData } from "../../features/UserData/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { access_token, status, error } = useSelector((state) => state.users);

  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const onSubmit = () => {
    dispatch(loginData(dataUser));
    setDataUser({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        Alert.alert("Login Success");
      } else {
        Alert.alert("Login Failed");
      }
    };
    if (status === "succeeded") {
      checkLoginStatus();
    } else if (status === "failed") {
      Alert.alert("Login gagal");
    }
  }, [status]);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        style={{ backgroundColor: "#00bce1" }}
        mode="contained"
        onPress={onSubmit}
      >
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
