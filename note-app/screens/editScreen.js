import { Dimensions, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import StyledButton from "../components/button";
import { useLoadNote } from "../util/useNote";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useCategory } from "../util/usecategory";
import { COLORS } from "../util/colors";
import { updateNoteById } from "../util/useNote";

const width = Dimensions.get("window").width;

const EditScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { note, noteLoading, reloadNote } = useLoadNote(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("default");

  const { categories, reloadCategories } = useCategory();

  useFocusEffect(reloadCategories);
  useFocusEffect(
    useCallback(() => {
      reloadNote();
    }, [id])
  );

  useEffect(() => {
    console.log(note);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategory(note.category);
    }
  }, [note]);

  async function handleNoteUpdate() {
    if (!note || !title || !content) return;

    await updateNoteById(id, {
      ...note,
      title,
      content,
      category: selectedCategory,
    });
    await navigation.navigate("notes");
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={[styles.titleInput, { color: COLORS.primary }]}
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
          <Picker.Item label="Default" value="default" />
          {categories.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

      <StyledButton
        style={{ marginTop: 40, backgroundColor: COLORS.primary }}
        title={"Update"}
        onPress={() => handleNoteUpdate()}
      />
    </View>
  );
};

export default EditScreen;

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
