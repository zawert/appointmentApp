import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import TouchableCompt from './TouchableCompt';
import Colors from '../../constants/color';

const DefaultButton = ({onPress, buttonStyle, textStyle, text}) => {
  return (
    <TouchableCompt onPress={onPress}>
      <View style={{...styles.button, ...buttonStyle}}>
        <Text style={{...styles.buttonText, ...textStyle}}>{text}</Text>
      </View>
    </TouchableCompt>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: "#8E5EFF",
  },
  buttonText: {
    color: Colors.white,
  },
});

export default DefaultButton;
