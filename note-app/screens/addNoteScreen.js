import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, randomNoteColor, useNoteColor } from "../util/colors";
import React, { useState } from "react";
import StyledButton from "../components/button";
import { addNote } from "../util/useNote";

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { noteColor } = useNoteColor();

  async function handleAddingNote() {
    console.log("Note added");
    await addNote({ title, content, color: noteColor });
    setTitle("");
    setContent("");
    await navigation.navigate("notes");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={[styles.titleInput, { color: noteColor }]}
        placeholder="title"
        onChangeText={(newText) => setTitle(newText)}
        defaultValue={title}
      />
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={styles.contentInput}
        placeholder="content"
        onChangeText={(newText) => setContent(newText)}
        defaultValue={content}
      />
      <StyledButton
        style={{ marginTop: 40, backgroundColor: noteColor }}
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
