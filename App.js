import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Main from "./screens/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loaded]=useFonts({
    InterB:require('./assets/fonts/Inter-Bold.ttf'),
    InterSb:require('./assets/fonts/Inter-SemiBold.ttf'),
    InterM:require('./assets/fonts/Inter-Medium.ttf'),
  })
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={Main}
            name="Main"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
