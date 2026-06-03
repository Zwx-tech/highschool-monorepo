import { Alert } from "react-native";

export function nativeConfirm(title, message) {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [
      { text: "OK", onPress: () => resolve(true) },
      { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
    ]);
  });
}
