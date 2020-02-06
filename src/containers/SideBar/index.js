import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import _ from 'lodash'

class SideBar extends Component {
  render() {
    const { BACKEN, PAPIERE, KELLNER, ABOUT_US, SERVICE, KONTACT, ANFRAGE, IMPRESSUM, DATENSCHUTZ } = this.props.language.lang
    const { top_space, data_anfrage } = this.props.main
    const count = _.size(data_anfrage)
    return (
      <View style={[styles.container, { paddingTop: top_space }]}>
        <Image style={styles.small_logo} source={require('../../img/logo_1024.png')} />
        <View style={styles.conent}>
          <Button title={BACKEN} onPress={() => this._goAndReset('Products')} />
          <Button title={PAPIERE} onPress={() => this._goAndReset('Papers')} />
          <Button title={KELLNER} onPress={() => this._goAndReset('Memo')} />
          <Button title={ANFRAGE} count={count} onPress={() => this._goAndReset('Anfrage')} />
          <Button title={ABOUT_US} onPress={() => this._goAndReset("AboutUs")} />
          <Button title={IMPRESSUM} onPress={() => this._goAndReset('Impressum')} />
          <Button title={DATENSCHUTZ} onPress={() => this._goAndReset('Datenschutz')} />
          <Button title={KONTACT} onPress={() => this._goAndReset('Kontact')} />
        </View>
      </View>
    );
  }
  _goAndReset(name) {
    this.props.navigation.navigate(name)
	}
}

class Button extends Component {
  render() {
    const { title, onPress, count } = this.props
    return (
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btn_title}>{title}</Text>
        {count ?
          <View style={styles.count_col}>
            <Text style={styles.count_title}>{count}</Text>
          </View>
          : null
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  small_logo : {
    width: 100,
    height: 100,
    marginVertical: 24,
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    padding: 5,
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_title: {
    color: '#000',
    fontSize: 16,
  },
  count_col: {
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#fb0d39",
    marginLeft: 5
  },
  count_title: {
    color: '#fff',
    fontSize: 12,
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language
  }
}

export default connect(mapStateToProps)(SideBar);
