import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import ButtonTile from './ButtonTile';
import { useState, useCallback, useEffect } from 'react'

const { width } = Dimensions.get('window');
const gap = 0;
const colCount = 4;
const buttonWidth = (width - gap * (colCount + 1)) / colCount;

const accent = '#e26969';
const secondary = '#35b5a9';

const ButtonPad = ({ handleUserInput }) => {
  return (
    <View style={styles.buttonPadWrapper}>
      <View style={styles.row}>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'C'} color={accent} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'CE'} color={accent} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'%'} color={secondary}/>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'/'} color={secondary} />
      </View>
      <View style={styles.row}>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'1'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'2'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'3'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'X'} color={secondary} />
      </View>
      <View style={styles.row}>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'4'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'5'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'6'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'+'} color={secondary} />
      </View>
      <View style={styles.row}>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'7'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'8'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'9'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'-'} color={secondary} />
      </View>
      <View style={styles.row}>
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'.'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'0'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'0'} />
        <ButtonTile handleUserInput={handleUserInput} width={buttonWidth} text={'='} filled/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPadWrapper: {
    backgroundColor: '#0c2f47',
    padding: gap
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: gap
  },
});

export default ButtonPad;
