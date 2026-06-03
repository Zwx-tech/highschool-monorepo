import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import SafeView from "../components/SafeView";
import StyledButton from "../components/StyledButton";

const RegisterView = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  async function handleUserRegister() {
    const apiUrl = `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}/register`;
    const reqQuery = `firstName=${firstName}&pass=${secondName}`;
    //* post req wasn't working idk why
    try {
      const res = await (await fetch(`${apiUrl}?${reqQuery}`)).json();
      if (!res.succes) {
        alert(res.message);
        return;
      }
      navigation.navigate("admin");
    } catch {
      console.log("Fetch err");
    }
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
    backgroundColor: "#010104",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A31D8",
  },
  headerText: {
    fontSize: 50,
    color: "#fff",
  },
  registerWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  registerHeader: {
    color: "#8F8CC8",
    fontSize: 23,
  },
  registerInput: {
    paddingVertical: 10,
    fontSize: 20,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#8F8CC8",
    width: "50%",
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "#433BFF",
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
