import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, randomNoteColor, useNoteColor } from "../util/colors";
import React, { useState, useEffect } from "react";
import StyledButton from "../components/button";
import { useCategory } from "../util/usecategory";

const AddCategoryScreen = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const { categories, addCategory } = useCategory();
  const { noteColor } = useNoteColor();

  async function handleAddingNote() {
    if (!categories.every((c) => c !== category)) return;
    addCategory(category);
    setCategory("");
  }

  //* TESTING HOOKS EFFICIENCY
  useEffect(() => {
    console.log("Category test", categories);
  }, [categories]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={[styles.titleInput, { color: noteColor }]}
        placeholder="category name"
        onChangeText={(newText) => setCategory(newText)}
        defaultValue={category}
      />
      <StyledButton
        style={{ marginTop: 20, backgroundColor: noteColor }}
        title={"Add"}
        onPress={() => handleAddingNote()}
      />
    </View>
  );
};

export default AddCategoryScreen;

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
