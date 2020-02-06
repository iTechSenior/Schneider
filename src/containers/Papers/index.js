
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'

const { width } = Dimensions.get('window')

import { Header } from '../../components'
import BottomBar from '../BottomBar'

class Papers extends Component {
  render() {
    const { PAPIERE, TITLE_PAPERS, TEXT_PAPERS, SHOW_OUR_PRODUCTS } = this.props.language.lang
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={PAPIERE} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1920, 1280, require('../../img/papers_bg.jpg'))}

            <View style={styles.block}>
              <Text style={styles.title_top}>{TITLE_PAPERS}</Text>
              <Text style={styles.text}>{TEXT_PAPERS}</Text>
              {this.resizeFunc(1000, 1000, require('../../img/papers_1.jpg'))}
              <View style={{height: 16}} />
              {this.resizeFunc(1000, 667, require('../../img/papers_2.jpg'))}
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('DetailsPapers')}>
              <Text style={styles.btn_title}>{SHOW_OUR_PRODUCTS}</Text>
            </TouchableOpacity>

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
  },
  btn: {
    marginTop: 32,
    width: '80%',
    height: 56,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef7d00'
  },
  btn_title: {
    color: '#fff',
    fontSize: 16
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Papers);
