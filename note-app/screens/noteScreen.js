import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useCallback } from "react";
import { COLORS } from "../util/colors";
import { useNotes } from "../util/useNote";
import NotePreview from "../components/notePreview";
import { useFocusEffect } from "@react-navigation/native";

const NoteScreen = () => {
  const { notes, notesLoading, reloadNotes } = useNotes();

  useFocusEffect(reloadNotes);

  return !notesLoading ? (
    <View style={styles.container}>
      <FlatList
        style={styles.noteList}
        data={notes}
        numColumns="2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotePreview
            title={item.title}
            content={item.content}
            color={item.color}
            date={item.noteDate}
          />
        )}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export { NoteScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  noteList: {
    width: "100%",
    padding: 10,
  },
});
