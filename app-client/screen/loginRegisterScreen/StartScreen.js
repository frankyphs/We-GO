import React from "react";
import Background from "../../components/loginRegisterComponent/Background";
import Logo from "../../components/loginRegisterComponent/Logo";
import Header from "../../components/loginRegisterComponent/Header";
import Button from "../../components/loginRegisterComponent/Button";
import Paragraph from "../../components/loginRegisterComponent/Paragraph";
import {Text} from "react-native";

export default function StartScreen({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Login or Register</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        style={{backgroundColor: "#00bce1"}}
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        // style={{color: "#00bce1"}}
        // color="#00bce1"
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={{color: "#00bce1"}}>Sign Up</Text>
      </Button>
    </Background>
  );
}
