import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const COLORS = {
  white: "#fff",
  black: "#000",
  lightAccent: "#2a2a2a",
  background: "#212121",
  darkAccent: "#1a1a1a",
  primary: "#94d5a5",
  secondary: "#2c5b71",
  accent: "#5677bd",
  text: "#F0F4EC",
  textLighter: "#c5c6c3",
};

export const NOTE_COLORS = [
  "#A1BAF0",
  "#BAA1F0",
  "#A1F0AB",
  "#F0A1BA",
  "#c99c7b",
  "#7b83c9",
];

export function randomNoteColor() {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
}

export function useNoteColor() {
  const [color, setColor] = useState();
  useFocusEffect(
    useCallback(() => {
      setColor(randomNoteColor());
    }, [])
  );

  return { noteColor: color };
}
