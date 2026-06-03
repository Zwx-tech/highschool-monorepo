import {
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import SafeView from "../components/SafeView";
import StyledButton from "../components/StyledButton";
import UserPreview from "../components/UserPreview";

function useUserList() {
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}`
      );
      const parsedData = await data.json();
      setUserList(parsedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshList = () => fetchData();

  return { loading, userList, refreshList };
}

const AdminView = ({ navigation }) => {
  const { loading, userList, refreshList } = useUserList();

  const userDeleteCallback = useCallback(async function (id) {
    console.log(123);
    const data = await fetch(
      `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}/delete-user?id=${id}`
    );
    refreshList();
  }, []);

  return !loading ? (
    <SafeView
      styles={{
        ...styles.container,
        alignItems: "center",
      }}
    >
      <StyledButton
        style={styles.registerButton}
        textStyle={styles.registerButtonText}
        title={"BACK TO LOGIN PAGE"}
        onPress={() => navigation.navigate("register")}
      />
      <View style={styles.listWrapper}>
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <UserPreview
              userData={item}
              deleteCallback={() => userDeleteCallback(item.id)}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeView>
  ) : (
    <SafeView
      styles={{
        ...styles.container,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </SafeView>
  );
};

export { AdminView };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010104",
  },
  registerButton: {
    backgroundColor: "#433BFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  listWrapper: {
    width: "100%",
    flex: 1,
  },
});
