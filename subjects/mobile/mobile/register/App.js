import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterView } from "./stacks/RegisterView";
import { AdminView } from "./stacks/AdminView";
import { DetailView } from "./stacks/DetailView";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen
          options={{ headerShown: false }}
          name="register"
          component={RegisterView}
        />
        <Stack.Screen
          options={{
            title: "admin page",
            headerStyle: {
              backgroundColor: "#8F8CC8",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          name="admin"
          component={AdminView}
        />
        <Stack.Screen
          options={{
            title: "details page",
            headerStyle: {
              backgroundColor: "#8F8CC8",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          name="details"
          component={DetailView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
