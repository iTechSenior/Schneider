
import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

import { ButtonGray } from '../../components'

import { changeLang } from '../../actions/Main'

class Welcome extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    const { SKIP, HERZLICH, STARTEN } = this.props.language.lang
    const { lang, top_space, bottom_space } = this.props.main
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../../img/bg.png')}>
          <Text style={[styles.top_text, { paddingTop: top_space + 10 }]} onPress={() => this.props.navigation.navigate('Main')}>{SKIP}</Text>

          <Image style={styles.logo} source={require('../../img/logo_1024.png')} />

          <Text style={styles.text}>{HERZLICH}</Text>

          <View style={styles.row}>
            <LangBtn active={lang === 'de'} source={require('../../img/lang_de.png')} onPress={() => this.props.changeLang('de')} />
            {/*<LangBtn active={lang === 'it'} source={require('../../img/lang_it.png')} onPress={() => this.props.changeLang('it')} />*/}
            <LangBtn active={lang === 'en'} source={require('../../img/lang_en.png')} onPress={() => this.props.changeLang('en')} />
          </View>

          <ButtonGray style={{marginBottom: bottom_space}} title={STARTEN} onPress={() => this.props.navigation.navigate('Main')} />
        </ImageBackground>
      </View>
    );
  }
}

class LangBtn extends Component {
  render() {
    const { source, onPress, active } = this.props
    return (
      <TouchableOpacity style={[styles.btn_lang, { borderColor: active ? '#f5a32e' : 'rgba(0, 0, 0, 0)'}]} onPress={onPress}>
        <Image style={styles.btn_lang_img} source={source} resizeMode={'stretch'} />
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  top_text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'right',
    alignSelf: 'flex-end',
    padding: 10
  },
  flex: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
    maxWidth: 300,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_lang: {
    width: 48,
    height: 24,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  btn_lang_img: {
    width: '100%',
    height: '100%'
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps, { changeLang })(Welcome);
