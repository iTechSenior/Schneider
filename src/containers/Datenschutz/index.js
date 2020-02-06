
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'

const { width } = Dimensions.get('window')

import { Header } from '../../components'
import BottomBar from '../BottomBar'

class Datenschutz extends Component {
  render() {
    const { DATENSCHUTZ, PRIVACY_TEXT } = this.props.language.lang
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={DATENSCHUTZ} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1200, 757, require('../../img/privacy_bg.jpg'))}
            <TextInput multiline editable={false} style={styles.text}>
              {PRIVACY_TEXT}
            </TextInput>
            <View style={{height: 32}} />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    );
  }
  resizeFunc(w, h, source){
    const del = w / width
    const new_height = h / del
    return(
      <Image style={{width: width, height: new_height}} source={source} resizeMode={'stretch'} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1
  },
  text: {
    color: '#000',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Datenschutz);
