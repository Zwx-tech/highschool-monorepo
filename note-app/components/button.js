import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../util/colors";

const StyledButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <View style={[styles.default, style]}>
      <Pressable onPress={onPress}>
        <Text style={[styles.textDefault, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textDefault: {
    color: COLORS.text,
  },
});
