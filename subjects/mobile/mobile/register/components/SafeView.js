import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import React from "react";

const SafeView = ({ children, styles }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default SafeView;
