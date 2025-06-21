import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/app/navigation/StackNavigator";
import "./global.css"

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
