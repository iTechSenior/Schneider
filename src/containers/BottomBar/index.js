import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { connect } from 'react-redux'
import getDirections from 'react-native-google-maps-directions'
import Communications from 'react-native-communications';
import _ from 'lodash'

class BottomBar extends Component {
  render() {
    const { ANFRAGE, LOCATION, PHONE, APPROACH, EMAIL_BAR } = this.props.language.lang
    const { bottom_space, data_anfrage } = this.props.main
    const _barStyle = {height: 56 + bottom_space, paddingBottom: bottom_space}
    const { anfrage_bool } = this.props;
    const count = _.size(data_anfrage)
    return (
      <View style={[styles.view, _barStyle]}>
        <Button title={LOCATION} source={require('../../img/location_icon.png')} onPress={() => this.locationFunc()} />
        {/*<Button title={PHONE} source={require('../../img/phone_icon.png')} onPress={() => this.phoneFunc()} />*/}
        <Button title={APPROACH} source={require('../../img/navigation_icon.png')} onPress={() => this.navigationFunc()} />
        {anfrage_bool ?
          <Button title={ANFRAGE} count={count} source={require('../../img/cart_icon.png')} onPress={() => this.cartFunc()} />
          :
          <Button title={EMAIL_BAR} source={require('../../img/mail_icon.png')} onPress={() => this.mailFunc()} />
        }
      </View>
    );
  }
  locationFunc(){
    Linking.openURL("https://www.google.com/maps/place/In+der+L%C3%A4ngerts+1,+73095+Albershausen,+Germany/@48.6880499,9.5514011,17z/data=!3m1!4b1!4m5!3m4!1s0x4799bcd79c70d261:0x1c46c1a3bb056574!8m2!3d48.6880499!4d9.5535898")
  }
  phoneFunc(){
    Communications.phonecall('0049 7161 30045', true)
  }
  navigationFunc(){
    const data = {
      destination: { latitude: 48.6880499, longitude: 9.5514011 },
      params: [{ key: "travelmode", value: "driving" }],
    }
    getDirections(data)
  }
  cartFunc(){
    const { navigation } = this.props;
    navigation.navigate('Anfrage')
  }
  mailFunc(){
    Communications.email(['info@schneider-gmbh.de'],null,null,'','')
  }
}

class Button extends Component {
  render() {
    const { title, source, onPress, count } = this.props;
    return (
      <TouchableOpacity style={styles.btn} onPress={() => onPress()}>
        <Image style={styles.btn_icon} source={source} resizeMode={"contain"} />
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
  view: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_icon: {
    width: 24,
    height: 24,
  },
  btn_title: {
    color: "#000",
    fontSize: 10,
    paddingTop: 3
  },
  count_col: {
    top: 6,
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#fb0d39",
    right: "25%"
  },
  count_title: {
    color: '#fff',
    fontSize: 12,
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(BottomBar);
