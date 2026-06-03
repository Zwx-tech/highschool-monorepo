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
      <View style={styles.textWrapper}>
        <Text style={styles.headerSubtitle}>Hello, Stanley!</Text>
        <Text style={styles.headerTitle}>{title} </Text>
      </View>
    </View>
  );
};

export { ScreenHeader };

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.darkAccent,
    paddingHorizontal: 20,
    height: 180,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerSubtitle: {
    marginTop: 20,
    fontSize: 20,
    color: COLORS.textLighter,
    textAlign: 'left',
  },
  headerTitle: {
    fontSize: 50,
    color: COLORS.white,
    textAlign: 'left'
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
