import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from "react-native";
import { connect } from 'react-redux'

import { Header, ItemHome } from '../../components'
import BottomBar from '../BottomBar'

class Home extends Component {
  render() {
    const { BACKEN, PAPIERE, KELLNER, WEITER_ZUR_PRODUCTEN, HOME_TEXT_1, HOME_TEXT_2, HOME_TEXT_3 } = this.props.language.lang
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../../img/bg.png')}>
          <Header menu={true} hide_search={true} props={this.props} onPressLeft={() => this.props.navigation.openDrawer()} />
          <ScrollView>
            <ItemHome source={require('../../img/home_1.jpg')} title={BACKEN} text={HOME_TEXT_1} btn_title={WEITER_ZUR_PRODUCTEN} onPress={() => navigation.navigate("Products")} />
            <ItemHome source={require('../../img/home_2.jpg')} title={PAPIERE} text={HOME_TEXT_2} btn_title={WEITER_ZUR_PRODUCTEN} onPress={() => navigation.navigate("Papers")} />
            <ItemHome source={require('../../img/home_3.jpg')} title={KELLNER} text={HOME_TEXT_3} btn_title={WEITER_ZUR_PRODUCTEN} onPress={() => navigation.navigate("Memo")} />
            <View style={{height: 32}} />
          </ScrollView>
        </ImageBackground>
        <BottomBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps)(Home);
