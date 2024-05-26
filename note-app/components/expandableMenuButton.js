import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { COLORS } from "../util/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const startingOffset = -30;
const endOffset = -80;
const itemGap = -80;

const ExpandableMenuButton = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const offset1 = useSharedValue(startingOffset);
  const offset2 = useSharedValue(startingOffset);
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);

  const rotation = useSharedValue(0);

  const labelOffset = useSharedValue(50);
  const labelOpacity = useSharedValue(0);

  //* Animation stuff
  //* Jeeez it's long
  const toggleMenu = () => {
    setExpanded(!expanded);
    if (!expanded) {
      offset1.value = withSpring(endOffset);
      offset2.value = withSpring(endOffset + itemGap);
      scale1.value = withSpring(1);
      scale2.value = withSpring(1);
      rotation.value = withSpring(45);
      labelOffset.value = withSpring(0);
      labelOpacity.value = withSpring(1);
    } else {
      offset1.value = withSpring(startingOffset);
      offset2.value = withSpring(startingOffset);
      scale1.value = withSpring(0);
      scale2.value = withSpring(0);
      rotation.value = withSpring(0);
      labelOffset.value = withSpring(50);
      labelOpacity.value = withSpring(0);
    }
  };

  //* First link button
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset1.value }, { scale: scale1.value }],
    };
  });

  //* Second link button
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset2.value }, { scale: scale2.value }],
    };
  });

  //* Rotate toggle button
  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  //* First label
  const labelStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: labelOffset.value }],
      opacity: labelOpacity.value,
    };
  });

  //* Second label
  const labelStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: labelOffset.value }],
      opacity: labelOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle1]}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            toggleMenu();
            navigation.navigate("add-note");
          }}
        >
          <MaterialIcons name="add" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Animated.View
          style={[styles.labelContainer, labelStyle1, { width: 95 }]}
        >
          <Text style={styles.labelText}>Add Note</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.circle, animatedStyle2]}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            toggleMenu();
            navigation.navigate("add-category");
          }}
        >
          <MaterialIcons
            style={{ paddingLeft: 5 }}
            name="playlist-add"
            size={30}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Animated.View
          style={[styles.labelContainer, labelStyle2, { width: 130 }]}
        >
          <Text style={styles.labelText}>Add Category</Text>
        </Animated.View>
      </Animated.View>
      <TouchableOpacity
        style={[
          styles.circle,
          {
            backgroundColor: expanded ? COLORS.lighterAccent : COLORS.primary,
          },
        ]}
        onPress={toggleMenu}
      >
        <Animated.View style={rotationStyle}>
          <AntDesign
            name="plus"
            size={30}
            color={expanded ? COLORS.white : COLORS.black}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ExpandableMenuButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 20,
    paddingRight: 20,
  },
  circle: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  link: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  labelContainer: {
    position: "absolute",
    right: 70,
    backgroundColor: COLORS.lighterAccent,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  labelText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
