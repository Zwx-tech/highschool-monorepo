import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { COLORS } from "../util/colors";
import { clearNotes } from "../util/useNote";
import DrawerIcon from "./drawerIcon";

export function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerIcon />

      <DrawerItem
        label="My notes"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="notes" size={size} color="#fff" />
        )}
        onPress={(route) => {
          navigation.navigate("notes");
        }}
      />
      <DrawerItem
        label="Add note"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="add-circle-outline" size={size} color="#fff" />
        )}
        onPress={(route) => {
          navigation.navigate("add-note");
        }}
      />
      <DrawerItem
        label="Add category"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="playlist-add" size={size} color="#fff" />
        )}
        onPress={(route) => {
          navigation.navigate("add-category");
        }}
      />
      <DrawerItem
        label="Clear notes"
        labelStyle={{
          color: COLORS.textLighter,
        }}
        icon={({ size }) => (
          <MaterialIcons name="delete-outline" size={size} color="#fff" />
        )}
        onPress={async (route) => {
          await clearNotes();
          alert("Cleared all notes successfully!");
          navigation.navigate("notes");
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
