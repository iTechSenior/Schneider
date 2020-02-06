
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Keyboard, Alert } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import email from 'react-native-email'

import { Section, Header, Input } from '../../components'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')
import { saveAnfrage } from '../../actions/Home'

class Anfrage extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props)
    this.state = {
      name: '',
      firma: '',
      telefon: '',
      e_mail: '',
      note: '',
      yOffset: 0,
      dropbox: false
    }
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }
  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount(){
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  _keyboardDidShow(){
    const { yOffset } = this.state;
    if(this.scroll){
      this.scroll.scrollTo({x: 0, y: yOffset + 100, animated: true})
    }
  }
  _keyboardDidHide(){
    const { yOffset } = this.state;
    if(this.scroll){
      this.scroll.scrollTo({x: 0, y: yOffset < 0 ? 0 : yOffset, animated: true})
    }
  }
  render() {
    const { ANFRAGE, ANFRAGE_FORM_TITLE, NAME_UND_VORNAME, FIRMA, TELEFON, EMAIL, NACHRICHT, ABBRECHEN, ANFRAGE_SENDEN, ANFRAGE_WIR_DIE, DATENSCHUTZBESTIMMUNGEN } = this.props.language.lang
    const { lang, data_anfrage } = this.props.main
    const { name, firma, telefon, e_mail, note, dropbox } = this.state
    return (
      <View style={styles.container}>

        <Header title={ANFRAGE} hide_search={true} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} ref={(c) => { this.scroll = c }}>
            <Text style={styles.form_title}>{ANFRAGE_FORM_TITLE}:</Text>
            <Section extraData={data_anfrage} sections={[{title: '', data: data_anfrage}]}
              refreshFunc={() => {}}
              itemFunc={(item, index) => {
                return(
                  <TouchableOpacity key={index} style={styles.view} onPress={() => {
                    const new_data = _.reduce(data_anfrage, (res, item_a) => {
                      if(item_a.id === item.id){
                        return res
                      } else {
                        return [...res, item_a]
                      }
                    }, [])
                    this.props.saveAnfrage(new_data)
                  }}>
                    <Text style={styles.title}>{lang === 'de' ? item.name.de : item.name.en}</Text>
                    <Image style={styles.image} source={require('../../img/close_icon.png')} resizeMode={'contain'} />
                  </TouchableOpacity>
                )
              }}
            />

            <Input
              placeholder={NAME_UND_VORNAME + '*'}
              value={name}
              onChangeText={(text) => this.setState({name: text})}
              refInput={(c) => { this.name = c }}
              onSubmitEditing={() => this.firma.focus()}
              onFocus={() => this.setState({yOffset: _.size(data_anfrage) > 5 ? 0 : -100})}
            />
            <Input
              placeholder={FIRMA + '*'}
              value={firma}
              onChangeText={(text) => this.setState({firma: text})}
              refInput={(c) => { this.firma = c }}
              onSubmitEditing={() => this.telefon.focus()}
              onFocus={() => this.setState({yOffset: 50})}
            />
            <Input
              placeholder={TELEFON}
              value={telefon}
              onChangeText={(text) => this.setState({telefon: text})}
              refInput={(c) => { this.telefon = c }}
              onSubmitEditing={() => this.e_mail.focus()}
              onFocus={() => this.setState({yOffset: 100})}
            />
            <Input
              placeholder={EMAIL + '*'}
              value={e_mail}
              onChangeText={(text) => this.setState({e_mail: text})}
              refInput={(c) => { this.e_mail = c }}
              onSubmitEditing={() => this.note.focus()}
              onFocus={() => this.setState({yOffset: 150})}
            />
            <Input
              placeholder={NACHRICHT}
              value={note}
              onChangeText={(text) => this.setState({note: text})}
              refInput={(c) => { this.note = c }}
              onFocus={() => this.setState({yOffset: 200})}
              multiline={true}
            />

            <View style={styles.dropbox_row}>
              <TouchableOpacity style={[styles.dropbox, { backgroundColor: dropbox ? "#408bfa" : "transparent"}]} onPress={() => this.setState({dropbox: !dropbox})}>
                {dropbox ? <Text style={styles.dropbox_check}>{"✓"}</Text> : null}
              </TouchableOpacity>
              <Text style={styles.dropbox_title}>{ANFRAGE_WIR_DIE} <Text style={styles.orange} onPress={() => this.props.navigation.navigate("Datenschutz")}>{DATENSCHUTZBESTIMMUNGEN}</Text></Text>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.footerBtn} onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.footerBtnTitle}>{ABBRECHEN}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerBtn} onPress={() => this.sendFunc(this.state)}>
                <Text style={styles.footerBtnTitle}>{ANFRAGE_SENDEN}</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 230}} />
          </ScrollView>
        </View>
        <BottomBar />
      </View>
    );
  }
  sendFunc(state){
    const { NAME_UND_VORNAME, FIRMA, TELEFON, EMAIL, NACHRICHT } = this.props.language.lang
    const { name, firma, telefon, e_mail, note } = state
    const { lang, data_anfrage } = this.props.main
    const items = data_anfrage ? _.reduce(data_anfrage, (res, item) => {
      const text = lang === 'de' ? res + ", " + item.name.de : res + ", " + item.name.en
      return text
    }, '') : ''
    if(_.size(name) && _.size(firma) && _.size(e_mail)){
      const to = ['info@schneider-gmbh.de']
        email(to, {
            cc: [],
            bcc: [],
            subject: 'Afrage aus der Schneider App',
            body: `
              ${NAME_UND_VORNAME}: ${name}
              \n
              ${FIRMA}: ${firma}
              ${TELEFON}: ${telefon}
              ${EMAIL}: ${e_mail}
              \n
              ${NACHRICHT}: ${note}
              \n
              ${_.size(items) ? "Anfrage für folgende(s) Produkt(e)" : ''}
              ${items}
            `
        }).catch(console.error)
    } else {
      Alert.alert('Error', "All fields are required", [
        {text: 'Ok', style: 'cancel'}
      ])
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 16,
    flex: 1
  },
  view: {
    paddingHorizontal: 16,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(193, 193, 193, 0.5)',
    marginBottom: 5
  },
  image: {
    width: 16,
    height: 16,
  },
  form_title: {
    color: '#000',
    fontSize: 16,
    padding: 16
  },
  footer: {
    paddingHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBtn: {
    width: width / 2 - 24,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f5a32e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerBtnTitle: {
    color: '#000',
    fontSize: 16
  },
  dropbox_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16
  },
  dropbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  dropbox_check: {
    color: "#fff",
    fontSize: 16
  },
  dropbox_title: {
    color: "#000",
    fontSize: 16,
  },
  orange: {
    color: "#f5a32e"
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps, { saveAnfrage })(Anfrage);
