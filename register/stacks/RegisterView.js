import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import SafeView from "../components/SafeView";
import StyledButton from "../components/StyledButton";

const RegisterView = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  function handleUserRegister() {
    fetch("127.0.0.1:3000/register", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        secondName,
      }),
    });
  }

  return (
    <SafeView styles={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RegisterView</Text>
      </View>
      <View style={styles.registerWrapper}>
        <Text style={styles.registerHeader}>Welcom in my app!</Text>
        <TextInput
          style={styles.registerInput}
          placeholder="Type ur name"
          placeholderTextColor="#fff"
          onChangeText={(newText) => setFirstName(newText)}
          defaultValue={firstName}
        />
        <TextInput
          style={styles.registerInput}
          placeholder="Type ur name"
          placeholderTextColor="#fff"
          onChangeText={(newText) => setSecondName(newText)}
          defaultValue={secondName}
        />
        <StyledButton
          title="REGISTER"
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
          onPress={() => handleUserRegister()}
        />
      </View>
    </SafeView>
  );
};

export { RegisterView };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#222",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  headerText: {
    fontSize: 60,
    color: "#fff",
  },
  registerWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  registerHeader: {
    color: "#aaa",
    fontSize: 23,
  },
  registerInput: {
    paddingVertical: 10,
    fontSize: 30,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "aquamarine",
    width: "50%",
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
