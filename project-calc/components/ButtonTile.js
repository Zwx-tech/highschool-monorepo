import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';

const ButtonTile = ({ text, color = '#fff', width, filled=false, handleUserInput }) => {
  return (
    <TouchableOpacity style={[styles.button, { width, height: width }]} onPress={() => handleUserInput(text)}>
      <View style={filled ? styles.innerButton: {}}>
        <Text style={{ color, fontSize: 20 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  innerButton: {
    width: "70%",
    height: "70%",
    backgroundColor: '#e26969',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#2c8897'
  }
});

export default ButtonTile;
