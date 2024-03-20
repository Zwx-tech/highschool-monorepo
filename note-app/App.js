import * as React from "react";
//* nav
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./components/customDrawer";
//* screens
import { NoteScreen } from "./screens/noteScreen";
import { ScreenHeader } from "./components/screenHeader";

//* icons
import { MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator(); //* create navigator

import { getHeaderTitle } from "@react-navigation/elements";

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);

            return <ScreenHeader title={title} navigation={navigation} />;
          },
        }}
      >
        <Drawer.Screen
          name="notes"
          component={NoteScreen}
          options={{
            title: "My Notes",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="notes" size={size} color="#fff" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
