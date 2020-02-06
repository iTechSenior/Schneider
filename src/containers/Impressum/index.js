
import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')

import { Header } from '../../components'
import BottomBar from '../BottomBar'

class Impressum extends Component {
  render() {
    const { IMPRESSUM, IMPRESSUM_TEXT_1, IMPRESSUM_TEXT_2, IMPRESSUM_EMAIL_TITLE, IMPRESSUM_EMAIL_TEXT, IMPRESSUM_TEXT_3, IMPRESSUM_TITLE, IMPRESSUM_TEXT_4 } = this.props.language.lang
    return (
      <View style={styles.container}>
        <Header title={IMPRESSUM} hide_search={true} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1200, 757, require('../../img/impressum_1.jpg'))}

            <View style={styles.block}>
              <Text style={styles.text}>{IMPRESSUM_TEXT_1}</Text>
              <Text style={[styles.text, { fontWeight: '500' }]}>{IMPRESSUM_TEXT_2}</Text>
              <Text style={styles.text}>{IMPRESSUM_EMAIL_TITLE} <Text style={{color: '#f5a32e'}}>{IMPRESSUM_EMAIL_TEXT}</Text></Text>
              <Text style={styles.text}>{IMPRESSUM_TEXT_3}</Text>
              {this.resizeFunc(918, 510, require('../../img/impressum_2.jpg'))}
            </View>
            <View style={styles.block}>
              <Text style={styles.title_top}>{IMPRESSUM_TITLE}</Text>
              <Text style={styles.text}>{IMPRESSUM_TEXT_4}</Text>
              {this.resizeFunc(800, 505, require('../../img/impressum_3.jpg'))}
            </View>
            {/*


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
              */}

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
  },
  content: {
    flex: 1,
  },
  bg: {
    flex: 1,
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
  }
}

export default connect(mapStateToProps)(Impressum);
