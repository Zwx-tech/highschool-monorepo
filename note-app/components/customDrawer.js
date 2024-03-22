import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="version"
        icon={() => (
          <MaterialIcons name="info-outline" size={24} color="#fff" />
        )}
        onPress={() => alert("v 0.0.1")}
      />
    </DrawerContentScrollView>
  );
}
