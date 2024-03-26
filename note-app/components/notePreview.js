import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const NotePreview = ({ title, content, color, date }) => {
  console.log(date);
  return (
    <View style={[styles.wrapper, { backgroundColor: color }]}>
      <Text>{title}</Text>
    </View>
  );
};

export default NotePreview;

const styles = StyleSheet.create({
  wrapper: {
    width: width / 2 - 30,
    margin: 10,
    padding: 10,
  },
});
