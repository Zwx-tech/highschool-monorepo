import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import StyledButton from "./StyledButton";

const imageSource = require("../assets/userIcon.png");

const UserPreview = ({ userData, deleteCallback, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.buttonWrapper}>
          <StyledButton
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
            title={"DETAILS"}
            onPress={() => navigation.navigate("details", { userData })}
          />
          <StyledButton
            style={styles.registerButton}
            textStyle={styles.registerButtonText}
            title={"DELETE"}
            onPress={deleteCallback}
          />
        </View>
      </View>
      <Text style={styles.bottomText}>
        {userData.id}: {userData.firstName}
      </Text>
    </View>
  );
};

export default UserPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerWrapper: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "contain",
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderRadius: 40,
    backgroundColor: "#8F8CC8",
    borderColor: "#8F8CC8",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 25,
    color: "#8F8CC8",
  },
  registerButton: {
    backgroundColor: "#433BFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
