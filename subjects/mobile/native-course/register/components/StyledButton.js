import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";

const StyledButton = ({ title, onPress, style = {}, textStyle = {} }) => {
  return (
    <View style={[styles.deafult, style]}>
      <TouchableHighlight onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  deafult: {},
});
