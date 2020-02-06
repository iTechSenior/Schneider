
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'

import { Section, Header } from '../../components'
import Beschreibung from './Beschreibung'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')
import { saveAnfrage } from '../../actions/Home'

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      index_swiper: 0,
      item: {},
      loading: true
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    const { lang } = this.props.main
    const { navigation } = this.props
    const item = navigation.getParam('item')
    const slug = lang === 'de' ? item.slug_de : item.slug_en
    axios({
      url: `https://www.schneider-gmbh.com/${lang}/api/4cd018b7ad0ce698d02494542e8f6e70/products/${slug}`,
      method: 'get'
    }).then((res) => {
      console.log(res)
      this.setState({item: res.data.article, loading: false})
    }).catch((err) => console.log(err.response))
  }
  render() {
    const { lang, data_anfrage } = this.props.main
    const { BESCHREIBUNG, KATALOG, VARIANTEN, SPEICHERN_ANFRAGE, GESPEICHERT } = this.props.language.lang
    const { index_swiper, item, loading } = this.state
    const { navigation } = this.props
    const name = item && item.name && lang === 'de' && item.name.de ? item.name.de : lang === 'en' && item.name && item.name.en ? item.name.en : ''
    const image = loading ? null : _.reduce(item.images, (res, val, key) => { return typeof val === 'string' ? val : val.url }, null);
    let bool = false
    const new_data = _.reduce(data_anfrage, (res, new_item, key) => {
      if(item.id === new_item.id){
        bool = true
        return res
      } else {
        return [...res, new_item]
      }
    }, [])
    const data_send = bool ? new_data : [...new_data, item]
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={name} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          {loading ? null
            :
            <ScrollView>
              <Image style={styles.image} source={image ? {uri: image} : require('../../img/noimage.png')} resizeMode={'contain'} />

              <View style={styles.nav}>
                <Text style={[styles.subtitle, { borderBottomColor: index_swiper === 0 ? "#f18c07" : '#fff'}]} onPress={() => this.scrollFunc(0, index_swiper)}>{BESCHREIBUNG}</Text>
                <View style={{flex: 1}} />
                <TouchableOpacity style={[styles.afrage, { backgroundColor: bool ? "#fac07d" : "transparent" }]} onPress={() => this.props.saveAnfrage(data_send)}>
                  <Text style={styles.anfrage_title}>{bool ? GESPEICHERT : SPEICHERN_ANFRAGE}</Text>
                </TouchableOpacity>
                {/*
                  <Text style={[styles.subtitle, { borderBottomColor: index_swiper === 1 ? "#f18c07" : '#fff'}]} onPress={() => this.scrollFunc(1, index_swiper)}>{KATALOG}</Text>
                  <Text style={[styles.subtitle, { borderBottomColor: index_swiper === 2 ? "#f18c07" : '#fff'}]} onPress={() => this.scrollFunc(2, index_swiper)}>{VARIANTEN}</Text>
                  */}
              </View>

              {
                index_swiper === 0 ?
                <Beschreibung data={item} props={this.props} />
                :
                index_swiper === 1 ?
                null
                :
                null
              }

            </ScrollView>
          }
        </View>
        <BottomBar navigation={this.props.navigation} anfrage_bool={true} />
      </View>
    );
  }
  scrollFunc(id, i){
    this.setState({index_swiper: id})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    width: '80%',
    height: 260,
    alignSelf: 'center'
  },
  nav: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0',
    paddingHorizontal: 16,
    paddingBottom: 3
  },
  subtitle: {
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  afrage: {
    borderWidth: 1,
    borderColor: '#f5a32e',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5
  },
  anfrage_title: {
    color: "#000",
    fontSize: 16,
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps, { saveAnfrage })(Details);
