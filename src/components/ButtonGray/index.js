
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

class ButtonGray extends Component {
  render() {
    const { style, title, onPress } = this.props
    return (
      <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
        <Text style={styles.btn_title}>{title}</Text>
      </TouchableOpacity>
    );
  }
}



const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 5,
    backgroundColor: '#4d535a',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btn_title: {
    color: '#fff',
    fontSize: 16,
  }
})

export default ButtonGray
