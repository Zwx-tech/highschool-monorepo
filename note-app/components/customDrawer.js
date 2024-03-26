import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { COLORS } from "../util/colors";
import { clearNotes } from "../util/useNote";
import { View, Text } from "react-native";
import DrawerIcon from "./drawerIcon";
export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerIcon />
      <DrawerItemList {...props} />

      <DrawerItem
        label="Clear notes"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="delete-outline" size={size} color="#fff" />
        )}
        onPress={async () => {
          await clearNotes();
          alert("Cleared all notes successfully!");
        }}
      />
      <DrawerItem
        label="Info"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="info-outline" size={size} color="#fff" />
        )}
        onPress={() => alert("Note app\nv 0.0.1\nStanisław Dębicki")}
      />
    </DrawerContentScrollView>
  );
}
