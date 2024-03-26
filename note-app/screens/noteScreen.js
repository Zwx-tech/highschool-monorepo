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
import { clearNotes, useNotes } from "../util/useNote";
import NotePreview from "../components/notePreview";
import { useFocusEffect } from "@react-navigation/native";

const NoteScreen = () => {
  const { notes, reloadNotes } = useNotes();

  useFocusEffect(reloadNotes);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.noteList}
        data={notes}
        numColumns="2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotePreview
            id={item.id}
            title={item.title}
            content={item.content}
            color={item.color}
            date={item.noteDate}
            refresh={reloadNotes}
          />
        )}
      />
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
