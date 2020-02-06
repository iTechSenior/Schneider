import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'

import { Section, Header } from '../../components'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')

class Memo extends Component {
  constructor(props){
    super(props)
    this.state = {
      articles: [],
      data_search: [],
      search_text: ''
    }
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount(){
    this.getCategories()
  }
  getCategories(){
    const { lang } = this.props.main
    axios({
      url: `https://www.schneider-gmbh.com/${lang}/api/4cd018b7ad0ce698d02494542e8f6e70/categories/kellner-notablocks`,
      method: 'get'
    }).then((res) => {
      console.log(res)
      const data = res.data.articles
      this.setState({articles: data, data_search: data})
    }).catch((err) => console.log(err))
  }
  searchFunc(text){
    const { lang } = this.props.main
    const { data_search } = this.state;
    const textData = text.toUpperCase()
    const newData = data_search.filter((item) => {
      const bool = item.name
      const name = bool && lang === 'de' ? bool.de.toUpperCase() : bool ? bool.en.toUpperCase() : ''
      return name.indexOf(textData) > -1
    })
    this.setState({search_text: text, articles: newData})
  }
  render() {
    const { KELLNER } = this.props.language.lang
    const { lang } = this.props.main
    const { articles, search_text } = this.state
    return (
      <View style={styles.container}>
        <Header title={KELLNER} search_text={search_text} props={this.props}
          onPressLeft={() => this.props.navigation.goBack()}
          onChangeText={(text) => this.searchFunc(text)}
        />
        <View style={styles.content}>
          <Section extraData={articles} sections={[{title: '', data: articles}]}
            refreshFunc={() => {}}
            itemFunc={(item, index) => {
              const image = _.reduce(item.images, (res, val, key) => { return val.url }, '');
              return(
                <TouchableOpacity key={index} style={styles.view} onPress={() => {
                   this.props.navigation.navigate('Details', { item })
                }}>
                  <Image style={styles.image} source={_.size(image) === 0 ? require('../../img/noimage.png') : {uri: image}} resizeMode={'contain'}/>
                  <Text style={[styles.title_pr, { alignSelf: 'center' }]}>{lang === 'de' ? item.name.de : item.name.en}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        <BottomBar />

      </View>
    );
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
    textAlign: 'center',
    flex: 1
  },
  view: {
    flex: 1,
    height: width / 3,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#c0c0c0'
  },
  image: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
    borderRadius: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Memo);
