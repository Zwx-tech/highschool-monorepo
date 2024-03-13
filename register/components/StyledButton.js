import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";

const StyledButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <TouchableHighlight style={[styles.deafult, style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  deafult: {},
});
