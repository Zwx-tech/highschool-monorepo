import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export function useCategory() {
  const [categories, setCategoires] = useState([]);

  //* helper used to fetch categories
  const reloadCategories = useCallback(async () => {
    try {
      const fetchedCategories = await SecureStore.getItemAsync("categories");
      if (fetchedCategories == null) {
        setCategoires([]);
        return;
      }

      setCategoires(await JSON.parse(fetchedCategories));
    } catch (e) {
      console.log(`Failed to load categories!\n ${e}`);
    }
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync("categories", JSON.stringify(categories));
  }, [categories]);

  return { categories, setCategoires, reloadCategories };
}
