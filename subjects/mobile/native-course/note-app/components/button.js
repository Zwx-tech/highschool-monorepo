import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../util/colors";

const StyledButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.default, style]}>
        <Text style={[styles.textDefault, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  textDefault: {
    color: COLORS.text,
  },
});
