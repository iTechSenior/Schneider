
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'

const { width } = Dimensions.get('window')

import { Header } from '../../components'
import BottomBar from '../BottomBar'

class AboutUs extends Component {
  render() {
    const { ABOUT_US, TITLE_1, TEXT_1, TITLE_2, TEXT_2, TITLE_3, TEXT_3, TITLE_4, TEXT_4 } = this.props.language.lang
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={ABOUT_US} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1920, 790, require('../../img/bg_about.jpg'))}

            <View style={styles.block}>
              <Text style={styles.title_top}>{TITLE_1}</Text>
              <Text style={styles.text}>{TEXT_1}</Text>
              {this.resizeFunc(600, 338, require('../../img/about_1.jpg'))}
            </View>

            <View style={styles.block}>
              <Text style={styles.title_top}>{TITLE_2}</Text>
              <Text style={styles.text}>{TEXT_2}</Text>
              {this.resizeFunc(600, 338, require('../../img/about_2.jpg'))}
            </View>

            <View style={styles.block}>
              <Text style={styles.title_top}>{TITLE_3}</Text>
              <Text style={styles.text}>{TEXT_3}</Text>
              {this.resizeFunc(600, 350, require('../../img/about_3.jpg'))}
            </View>

            <View style={styles.block}>
              <Text style={styles.title_top}>{TITLE_4}</Text>
              <Text style={styles.text}>{TEXT_4}</Text>
              {this.resizeFunc(600, 338, require('../../img/about_4.jpg'))}
              {this.resizeFunc(600, 338, require('../../img/about_5.jpg'))}
            </View>

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
    flex: 1,
  },
  back_btn: {
    padding: 10
  },
  back_img: {
    width: 20,
    height: 20
  },
  title: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  block: {
    flex: 1,
  },
  title_top: {
    backgroundColor: '#eee',
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: 'center'
  },
  text: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    padding: 16
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(AboutUs);
