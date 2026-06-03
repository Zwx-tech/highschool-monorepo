import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useMemo } from "react";
import { COLORS } from "../util/colors";
import { useNotes } from "../util/useNote";
import NotePreview from "../components/notePreviewModern";
import { useFocusEffect } from "@react-navigation/native";
import ExpandableMenuButton from "../components/expandableMenuButton";

const NoteScreen = ({ navigation }) => {
  const { notes, reloadNotes } = useNotes();
  const [query, setQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const loweredQuery = query.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(loweredQuery) ||
        note.content.toLowerCase().includes(loweredQuery) ||
        note.category.toLowerCase().includes(loweredQuery)
    );
  }, [query, notes]);

  useFocusEffect(reloadNotes);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={COLORS.textLighter}
        style={[styles.queryInput, { color: COLORS.white }]}
        placeholder="search"
        onChangeText={(newQuery) => setQuery(newQuery)}
        defaultValue={query}
      />
      <FlatList
        style={styles.noteList}
        data={filteredNotes}
        numColumns="2"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotePreview
            id={item.id}
            title={item.title}
            content={item.content}
            color={item.color}
            date={item.noteDate}
            category={item.category}
            refresh={reloadNotes}
            navigation={navigation}
          />
        )}
      />
      <ExpandableMenuButton navigation={navigation}></ExpandableMenuButton>
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
  queryInput: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: COLORS.lightAccent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
});
