import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLoadNote } from "../util/useNote";
import { useFocusEffect } from "@react-navigation/native";

const EditScreen = ({ route }) => {
  const { id } = route.params;
  const { note, noteLoading, reloadNote } = useLoadNote(id);

  useFocusEffect(reloadNote);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({});
