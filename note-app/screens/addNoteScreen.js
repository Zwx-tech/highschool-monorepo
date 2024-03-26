import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../util/colors";
import React, { useState } from "react";
import StyledButton from "../components/button";
import { addNote, fetchAllNotes } from "../util/useNote";

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleAddingNote() {
    await addNote({ title, content, color: COLORS.primary });
    await navigation.navigate("notes");
  }

  fetchAllNotes().then((data) => console.log(JSON.stringify(data, null, 5)));

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={styles.titleInput}
        placeholder="title"
        onChangeText={(newText) => setTitle(newText)}
      />
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={styles.contentInput}
        placeholder="content"
        onChangeText={(newText) => setContent(newText)}
      />
      <StyledButton
        style={{ marginTop: 40 }}
        title={"Add"}
        onPress={() => handleAddingNote()}
      />
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "center",
  },
  titleInput: {
    color: COLORS.primary,
    fontWeight: "500",
    fontSize: 30,
    marginBottom: 15,
    width: "100%",
  },
  contentInput: {
    color: COLORS.text,
    width: "100%",
  },
});
