import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

class ItemHome extends Component {
  render() {
    const { source, title, text, onPress, btn_title } = this.props
    return (
      <View style={styles.view}>
        <View style={styles.block}>
          <Image style={styles.image} source={source} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btn_title}>{btn_title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  view: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  block: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 16
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center'
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center'
  },
  text: {
    color: '#000',
    fontSize: 12,
    width: '100%',
    paddingBottom: 10
  },
  btn: {
    backgroundColor: "#f18d56",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btn_title: {
    color: "#fff",
    fontSize: 18
  }
})

export default ItemHome
