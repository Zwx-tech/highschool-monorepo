import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonPad from './components/ButtonPad';
import { useState, useCallback, useEffect } from 'react';


function isNumeric(value) {
  return /^\d+$/.test(value);
}

export default function App() {
  const [currentExpression, setCurrentExpression] = useState('0')
  const [evaluatedValue, setEvaluatedValue] = useState('0')

  const handleUserInput = useCallback((key) => {
    const previousKey = currentExpression[currentExpression.length - 1];
    switch(key) {
      case 'CE':
        setCurrentExpression('0');
        setEvaluatedValue('0')
        break;
      case 'C':
        if(currentExpression === '0') return;
        if(currentExpression.lenght === 1) {
          setCurrentExpression('0');
          return;
        }
        setCurrentExpression(prev => prev.slice(0, -1))
      break;
      case '.':
        console.log(previousKey);
        if(!isNumeric(previousKey)) return;
        setCurrentExpression(currentExpression + key)
        break;
      case '=':
        // TODO: eval
        let valueToEval = currentExpression; 
        if(!isNumeric(currentExpression[0])) {
          valueToEval = evaluatedValue + currentExpression;
        }
        try {
          const value = eval(valueToEval); 
          // set 
          setEvaluatedValue(value);
          setCurrentExpression('0');
        } catch {
          
        }

        break;
      case 'X':
        setCurrentExpression(currentExpression + '*');
        break;
      default:
        if(currentExpression === '0'){
          setCurrentExpression(key)
          return;
        }
        setCurrentExpression(currentExpression + key)
        break;
      }
  }, [currentExpression]);

  return (
    <View style={styles.container}>
      <Text style={styles.evaluatedValue}>{currentExpression}</Text>
      <Text style={styles.currentExpression}>{evaluatedValue}</Text>
      <View style={styles.separator}></View>
      <ButtonPad handleUserInput={handleUserInput}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'flex-end',
    backgroundColor: '#0a273a'
  },
  evaluatedValue: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    color: '#fff',
    fontSize: 32,
    paddingRight: 15,
    color: '#aaa'
  },
  currentExpression: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignItems: 'flex-end',
    width: '100%',
    color: '#fff',
    paddingBottom: 30,
    fontSize: 65,
    paddingRight: 15
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: '#aaa'
  }
});
