import * as React from "react";
//* nav
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./components/customDrawer";
//* screens
import { NoteScreen } from "./screens/noteScreen";

//* icons
import { MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator(); //* create navigator

import { COLORS } from "./util/colors";
import AddNoteScreen from "./screens/addNoteScreen";
import AddCategoryScreen from "./screens/addCategoryScreen";
import EditScreen from "./screens/editScreen";

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.darkAccent,
          },
          headerTintColor: COLORS.textLighter,
          drawerStyle: {
            backgroundColor: COLORS.darkAccent,
          },
          drawerLabelStyle: {
            color: COLORS.textLighter,
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
        <Drawer.Screen
          name="add-note"
          component={AddNoteScreen}
          options={{
            title: "Add note",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="add-circle-outline"
                size={size}
                color="#fff"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="add-category"
          component={AddCategoryScreen}
          options={{
            title: "Add category",
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons name="playlist-add" size={size} color="#fff" />
            ),
          }}
        />
        <Drawer.Screen
          name="edit-note"
          component={EditScreen}
          options={{
            title: "Edit note",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
