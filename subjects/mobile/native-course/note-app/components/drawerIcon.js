import { View, Text } from "react-native";
import { COLORS } from "../util/colors";
import React from "react";

const DrawerIcon = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          marginHorizontal: "auto",
          width: 120,
          height: 120,
          borderRadius: 60,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.lightAccent,
        }}
      >
        <Text
          style={{
            fontSize: 38,
            color: COLORS.text,
          }}
        >
          N
        </Text>
      </View>
    </View>
  );
};

export default DrawerIcon;
