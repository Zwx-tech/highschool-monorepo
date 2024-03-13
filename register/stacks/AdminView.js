import { StyleSheet, Text, Button } from "react-native";
import React from "react";
import SafeView from "../components/SafeView";

const AdminView = ({ route, navigation }) => {
  return (
    <SafeView>
      <Text>AdminView</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("register")} />
    </SafeView>
  );
};

export { AdminView };

const styles = StyleSheet.create({});
