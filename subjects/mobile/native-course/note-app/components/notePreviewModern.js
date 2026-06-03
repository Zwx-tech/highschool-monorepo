import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../util/colors";
import { deleteNoteById } from "../util/useNote";
import { nativeConfirm } from "../util/alerts";

const { width } = Dimensions.get("window");

const NotePreview = ({
  title,
  content,
  color,
  date,
  category,
  id,
  refresh,
  navigation,
}) => {
  async function handleNoteDeletion() {
    if (!(await nativeConfirm("Note deletion", "Are u sure?"))) return;
    try {
      await deleteNoteById(`${id}`);
    } catch (e) {
      console.log(e);
    }

    refresh();
  }

  function handleNoteEdit() {
    console.log("EDIT NOTE");
    navigation.navigate("edit-note", { id: id });
  }

  return (
    <Pressable
      onLongPress={() => handleNoteDeletion()}
      onPress={() => handleNoteEdit()}
    >
      <View style={[styles.wrapper, { backgroundColor: color }]}>
        <View style={styles.categoryWrapper}>
          <Text style={[styles.category, { color }]}>{category}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </Pressable>
  );
};

export default NotePreview;

const styles = StyleSheet.create({
  wrapper: {
    width: width / 2 - 30,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    aspectRatio: "8 / 7",
  },
  title: {
    fontSize: 20,
    marginTop: 4,
    marginBottom: 4,
    color: COLORS.white,
  },
  date: {
    textAlign: "right",
    color: COLORS.white,
  },
  content: {
    color: COLORS.white,
  },
  categoryWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 4,
  },
  category: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "auto",
    borderRadius: 5,
    textTransform: "uppercase",
    fontWeight: "500",
  },
});
