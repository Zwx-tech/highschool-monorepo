import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAccelerometer } from "@/hooks/useAccelerometer";
import { useGyroscope } from "@/hooks/useGyroscope";
import { useWebsocket } from "@/hooks/useWebsocket";

export default function App() {
  const { acceleration, subscription, _subscribe, _unsubscribe } =
    useAccelerometer();

  const [breakActive, setBreakActive] = useState(false);
  const [gasActive, setGasActive] = useState(false);

  const { x, y, z } = acceleration;
  const { ws, sendWithThrottle } = useWebsocket();

  useEffect(() => {
    const data = { acceleration: { x, y, z }, breakActive, gasActive };
    sendWithThrottle(data, 50);
  }, [acceleration]);

  return (
    <View style={styles.container}>
      <View style={styles.ui}>
        <View style={styles.inputButton}>
          <TouchableOpacity
            onPressIn={() => setBreakActive(true)}
            onPressOut={() => setBreakActive(false)}
            style={styles.inputButtonInner}
          >
            <Text>Break</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>
            Accelerometer: (in gs where 1g = 9.81 m/s^2)
          </Text>
          <Text style={styles.text}>x: {x.toPrecision(6)}</Text>
          <Text style={styles.text}>y: {y.toPrecision(6)}</Text>
          <Text style={styles.text}>z: {z.toPrecision(6)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={subscription ? _unsubscribe : _subscribe}
              style={styles.button}
            >
              <Text>{subscription ? "On" : "Off"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputButton}>
          <TouchableOpacity
            onPressIn={() => setGasActive(true)}
            onPressOut={() => setGasActive(false)}
            style={styles.inputButtonInner}
          >
            <Text>Gas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  ui: {
    transform: "rotate(90deg)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 60,
    gap: 40,
  },
  inputButton: {
    flexDirection: "row",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 200,
  },
  inputButtonInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
    borderRadius: 100,
  },
});
