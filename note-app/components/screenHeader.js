import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../util/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenHeader = ({ title, style, navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
        },
        styles.headerWrapper,
      ]}
    >
      <Text style={styles.headerSubtitle}>Hello, Stanley!</Text>
      <Text style={styles.headerTitle}>{title} </Text>
    </View>
  );
};

export { ScreenHeader };

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.darkAccent,
    paddingHorizontal: 20,
    height: 180,
  },
  headerSubtitle: {
    marginTop: 20,
    fontSize: 20,
    color: COLORS.textLigher,
  },
  headerTitle: {
    fontSize: 50,
  },
});
