import { View, StyleSheet } from "react-native";
import Item from "./Item";
import React from "react";

const Row = ({ colors, reversed = false }) => {
  if (reversed) {
    colors.reverse();
  }
  return (
    <View style={styles.row}>
      {[...colors].map((color, id) => {
        return (
          <Item text={`${reversed ? colors.length - id: id + 1}`} color={color} key={id}></Item>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#333",
  },
});

export default Row;
