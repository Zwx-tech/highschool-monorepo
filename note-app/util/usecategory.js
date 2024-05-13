import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

export function useCategory() {
  const [categories, setCategories] = useState([]);

  //* helper used to fetch categories
  const reloadCategories = useCallback(() => {
    async function reloadCategoriesAsync() {
      console.log("RELOADING CATEGORIES");
      try {
        const fetchedCategories = await SecureStore.getItemAsync("categories");
        if (fetchedCategories == null) {
          setCategories([]);
          return;
        }
        setCategories(await JSON.parse(fetchedCategories));
      } catch (e) {
        console.log(`Failed to load categories!\n ${e}`);
      }
    }
    reloadCategoriesAsync();
  }, []);

  const addCategory = useCallback((c) => {
    async function _addCategory(category) {
      console.log("ADDING CATEGORYr");
      await SecureStore.setItemAsync(
        "categories",
        JSON.stringify([category, ...categories])
      );
      setCategories((prev) => [...prev, category]);
      console.log("ADDED CATEGORY");
    }

    _addCategory(c);
  });

  useEffect(() => {
    reloadCategories();
  }, []);

  return { categories, setCategories, reloadCategories, addCategory };
}
