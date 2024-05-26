import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, randomNoteColor, useNoteColor } from "../util/colors";
import React, { useEffect, useState } from "react";
import StyledButton from "../components/button";
import { addNote } from "../util/useNote";
import { Picker } from "@react-native-picker/picker";
import { useCategory } from "../util/usecategory";
import { useFocusEffect } from "@react-navigation/native";

const width = Dimensions.get("window").width;

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");

  const { noteColor } = useNoteColor();
  const { categories, reloadCategories } = useCategory();

  //* RELOAD CATEGORIES
  useFocusEffect(reloadCategories);

  //* TESTING HOOKS EFFICIENCY
  //* Its fixed now but we still need to monitor this
  useEffect(() => {
    console.log("Category test", categories);
  }, [categories]);

  async function handleAddingNote() {
    console.log("Note added");
    console.log(selectedCategory);
    await addNote({
      title,
      content,
      color: noteColor,
      category: selectedCategory,
    });
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
        multiline={true}
      />
      <View style={[styles.pickerWrapper]}>
        <Picker
          mode="dropdown"
          style={[styles.categoryPicker]}
          dropdownIconColor={COLORS.white}
          itemStyle={styles.pickerItem}
          themeVariant={"dark"}
          selectedValue={selectedCategory}
          onValueChange={(newCategory) => setSelectedCategory(newCategory)}
        >
          <Picker.Item label="Select category" value="default" />
          {categories.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

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
  categoryPicker: {
    width: "100%",
    color: COLORS.white,
    backgroundColor: COLORS.lightAccent,
    paddingHorizontal: 10,
    height: 30,
  },
  pickerItem: {
    height: 30,
    padding: 0,
    backgroundColor: COLORS.lightAccent,
  },
  pickerWrapper: {
    marginTop: 20,
    height: 55,
    width: width - 60,
    overflow: "hidden",
    borderRadius: 30,
  },
});
