import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Item = ({text, color='red'}) => {
  const onPress = () => {
    alert(`\nid=${text}\nbg=${color}`)
  }
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={[styles.item, {backgroundColor: color}]}>
        <Text style={styles.text}>{text}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item: {
      width: "100%",
      flexGrow: 1,
      textAlign: 'center',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
});
  

export default Item