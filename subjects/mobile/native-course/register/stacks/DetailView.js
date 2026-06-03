import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const imageSize = Math.round(windowWidth / 2);
const imageBorderRadius = Math.round(windowWidth / 4);

const imageSource = require("../assets/userIcon.png");

const DetailView = ({ route }) => {
  const { userData } = route.params;
  return (
    <SafeView styles={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text style={styles.textLabel}>login:</Text>
      <Text style={styles.userText}>{userData.firstName}</Text>
      <Text style={styles.textLabel}>password:</Text>
      <Text style={styles.userText}>{userData.pass}</Text>
      <Text style={styles.textLabel}>registerd:</Text>
      <Text style={styles.userText}>{userData.creationTime}</Text>
    </SafeView>
  );
};

export { DetailView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010104",
    gap: 15,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageBorderRadius,
    resizeMode: "contain",
  },
  imageWrapper: {
    width: imageSize + 10,
    height: imageSize + 10,
    borderWidth: 5,
    borderRadius: imageBorderRadius + 5,
    backgroundColor: "#8F8CC8",
    borderColor: "#8F8CC8",
  },
  textLabel: {
    color: "#8F8CC8",
  },
  userText: {
    color: "#433BFF",
    fontSize: 20,
    fontWeight: "700",
  },
});
