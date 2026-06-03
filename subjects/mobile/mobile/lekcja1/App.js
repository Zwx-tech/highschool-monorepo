import { StatusBar, StyleSheet, View } from "react-native";
import Row from "./components/Row";


//? there is problably easier way to do it tho...
const colors = ["teal", "blueviolet", "indigo", "forestgreen", "purple", 'cornflowerblue'];
const colorsFirst = colors.filter((_, id) => id % 2 == 0)
const colorsSecond = colors.filter((_, id) => id % 2 == 1)
const checker = [...colorsFirst, ...colorsSecond]
const checkerReversed = [...colorsFirst, ...colorsSecond].reverse()

export default function App() {

  return (
    <View style={styles.container}>
        <StatusBar />
        <Row colors={[...checker]}/>
        <Row colors={[...checker]} reversed/>      
        <Row colors={[...checker]}/>      
        <Row colors={[...checker]} reversed/>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
