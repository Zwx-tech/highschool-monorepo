import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const NotePreview = ({ title, content, color, date }) => {
  console.log(date);
  const month = new Date(date).toLocalDateString("pl-PL", { month: "short" });
  // console.log(month);
  return (
    <View style={[styles.wrapper, { backgroundColor: color }]}>
      <Text></Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
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
