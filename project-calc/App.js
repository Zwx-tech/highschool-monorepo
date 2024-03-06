import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonPad from './components/ButtonPad';
import { useState } from 'react'
export default function App() {
  const [currentExpression, setCurrentExpression] = useState('')
  const [evaluatedValue, setEvaluatedValue] = useState('')

  return (
    <View style={styles.container}>
      <Text>{evaluatedValue}</Text>
      <Text>{currentExpression}</Text>
      <ButtonPad/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  evaluatedValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 2
  },
  currentExpression: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1
  }
});
