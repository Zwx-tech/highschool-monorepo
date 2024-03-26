import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../util/colors";
import { deleteNoteById } from "../util/useNote";
import { nativeConfirm } from "../util/alerts";

const { width } = Dimensions.get("window");

const NotePreview = ({ title, content, color, date, id, refresh }) => {
  async function handleNoteDeletion() {
    if (!(await nativeConfirm("Note deletion", "Are u sure?"))) return;
    try {
      await deleteNoteById(`${id}`);
    } catch (e) {
      console.log(e);
    }

    refresh();
  }

  return (
    <Pressable onLongPress={() => handleNoteDeletion()}>
      <View style={[styles.wrapper, { backgroundColor: color }]}>
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
});
