import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: false,
    }
  }
  render(){
    const { title, onPressLeft, search_text, props, hide_search, menu, style } = this.props;
    const { search } = this.state;
    const { SEARCH } = props.language.lang
    const { top_space } = this.props.main;
    const _styleHeader = {height: 56 + top_space, paddingTop: top_space}
    if(search){
      return(
        <View style={[styles.header, _styleHeader]}>
          <TouchableOpacity style={styles.button_left} onPress={() => {
            this.setState({search: false})
            this.props.onChangeText('')
          }}>
            <Image style={styles.button_left_icon} source={require('../../img/back_icon.png')} />
          </TouchableOpacity>
          <View style={styles.input_block}>
            <TextInput
              style={styles.textInput}
              placeholder={SEARCH}
              autoCorrect={false}
              autoCapitalize='none'
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(9, 28, 74, 0.6)'
              selectionColor='#091c4a'
              value={search_text}
              autoFocus={true}
              ref={(c) => { this.input = c }}
              onChangeText={(new_text) => this.props.onChangeText(new_text)}
            />
          </View>
          {search_text === '' ? null :
            <TouchableOpacity style={styles.button_right} onPress={() => this.props.onChangeText('')}>
              <Image style={styles.button_right_close} source={{uri: ''}} />
            </TouchableOpacity>
          }
        </View>
      )
    } else {
      return(
        <View style={[styles.header, style, _styleHeader]}>
          <TouchableOpacity style={styles.button_left} onPress={onPressLeft}>
            <Image style={styles.button_left_icon} source={menu ? require('../../img/menu_icon.png') : require('../../img/back_icon.png')} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
          {hide_search ? <View style={[styles.button_right, { paddingHorizontal: 16}]} />
            :
            <TouchableOpacity style={[styles.button_right, { marginLeft: 0, paddingHorizontal: 5 }]} onPress={() => this.setState({search: true})}>
              <Image style={styles.button_right_icon} source={require('../../img/search_icon.png')} />
            </TouchableOpacity>
          }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 23,
    elevation: Platform.OS === 'android' ? 4 : 0,
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 1, height: 3},
    shadowOpacity: 1,
    shadowRadius: 1,
    paddingHorizontal: 6
  },
  button_left: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_left_icon: {
    width: 20,
    height: 20,
  },
  title: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  button_right: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_right_icon: {
    width: 20,
    height: 20
  },
  input_block: {
    padding: 10,
    flex: 1,
  },
  textInput: {
    flex: 1,
    padding: 2,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16,
  },
  button_right_close: {
    width: 20,
    height: 20
  },
});

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Header);
