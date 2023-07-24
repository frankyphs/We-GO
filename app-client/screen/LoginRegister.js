import {Provider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../features/core/theme";

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  ResetPasswordScreen,
} from "./loginRegisterScreen";
const Stack = createStackNavigator();

function LoginRegister() {
  return (
    // <Provider theme={theme}>
    //   <NavigationContainer>
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}

const styles = {};

export default LoginRegister;
