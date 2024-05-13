import * as SecureStore from "expo-secure-store";
import { useEffect, useState, useCallback } from "react";

export async function fetchAllNotes() {
  const noteListUnparsed = await SecureStore.getItemAsync("allNotes");
  //* resolve null
  if (noteListUnparsed === null) return [];
  return Promise.all(
    JSON.parse(noteListUnparsed).map(async (id) => {
      const item = await SecureStore.getItemAsync(id);
      return JSON.parse(item);
    })
  );
}

async function addNoteToNoteList(id) {
  const noteListUnparsed = await SecureStore.getItemAsync("allNotes");
  //* resolve null
  const noteList =
    noteListUnparsed === null ? [] : JSON.parse(noteListUnparsed);
  await SecureStore.setItemAsync("allNotes", JSON.stringify([...noteList, id]));
}

export async function clearNotes() {
  const noteListUnparsed = await SecureStore.getItemAsync("allNotes");
  //* resolve null
  if (noteListUnparsed === null) return;
  for (const id of JSON.parse(noteListUnparsed)) {
    await SecureStore.deleteItemAsync(id);
  }
  await SecureStore.setItemAsync("allNotes", "[]");
}

export async function deleteNoteById(id) {
  try {
    await SecureStore.deleteItemAsync(id);
    await removeNoteFromNoteList(id);
  } catch (e) {
    console.log(e);
  }
}

async function removeNoteFromNoteList(id) {
  try {
    //* resolve null
    const noteListUnparsed = await SecureStore.getItemAsync("allNotes");
    if (noteListUnparsed === null) return;
    console.log(noteListUnparsed);
    const updatedNoteList = JSON.parse(noteListUnparsed).filter(
      (noteID) => noteID != id
    );
    await SecureStore.setItemAsync("allNotes", JSON.stringify(updatedNoteList));
  } catch (e) {
    console.log(e);
  }
}

//* interface note: {title: string, content: string, color}
export async function addNote(note) {
  try {
    const noteDate = new Date();
    const month = noteDate
      .toLocaleDateString("pl-PL", { month: "short" })
      .toUpperCase();
    const day = noteDate.toLocaleDateString("pl-PL", { day: "2-digit" });
    const noteID = `${Date.now()}`;
    await SecureStore.setItemAsync(
      noteID,
      JSON.stringify({
        ...note,
        id: noteID,
        noteDate: `${day} ${month}`,
      })
    );
    await addNoteToNoteList(noteID);
  } catch {}
}

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);

  async function loadNotes() {
    setNotesLoading(true);
    const fetchedNotes = await fetchAllNotes();
    setNotes(fetchedNotes);
    setNotesLoading(false);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const reloadNotes = useCallback(() => {
    loadNotes();
  }, []);

  return { notes, notesLoading, reloadNotes };
}
