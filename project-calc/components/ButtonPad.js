import { View, StyleSheet , Text} from 'react-native'
import React from 'react'

const ButtonPad = () => {
  return (
    <View styles={styles.buttonPadWrapper}>
      <Text>ButtonPad</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonPadWrapper: {
      flex: 1,
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 4,
    },
  });
  

export default ButtonPad