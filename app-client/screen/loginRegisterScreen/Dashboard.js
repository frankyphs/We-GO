import React from "react";
import Background from "../../components/loginRegisterComponent/Background";
import Logo from "../../components/loginRegisterComponent/Logo";
import Header from "../../components/loginRegisterComponent/Header";
import Paragraph from "../../components/loginRegisterComponent/Paragraph";
import Button from "../../components/loginRegisterComponent/Button";

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: "StartScreen"}],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
}
