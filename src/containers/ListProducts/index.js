
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'

import { Section, Header } from '../../components'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')

class ListProducts extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props)
    this.state = {
      articles: [],
      data_search: [],
      search_text: '',
      product_name: ''
    }
  }
  componentDidMount(){
    const { navigation } = this.props
    const name = navigation.getParam('product_name')
    const product_item = navigation.getParam('product_item')
    this.setState({product_name: name})
    this.getProducts(product_item)
  }
  getProducts(product_item){
    const { lang } = this.props.main
    axios({
      url: `https://www.schneider-gmbh.com/${lang}/api_v2/4cdaaab7ad0ce698d02494542e8f6111/category/${product_item.id}/products`,
      method: 'get'
    }).then((res) => {
      console.log(res)
      this.setState({articles: res.data.articles, data_search: res.data.articles})
    }).catch((err) => console.log(err.response))
  }
  searchFunc(text){
    const { lang } = this.props.main
    const { data_search } = this.state;
    const textData = text.toUpperCase()
    const newData = data_search.filter((item) => {
      const bool = item.name
      const name = bool && lang === 'de' ? bool.de.toUpperCase() : bool ? bool.en.toUpperCase() : ''
      const order_number = item.order_number ? item.order_number.toUpperCase() : ''
      return name.indexOf(textData) > -1 || order_number.indexOf(textData) > -1
    })
    this.setState({search_text: text, articles: newData})
  }
  render() {
    const { articles, search_text, product_name } = this.state
    const { lang } = this.props.main
    return (
      <View style={styles.container}>

        <Header title={product_name} search_text={search_text} props={this.props}
          onPressLeft={() => this.props.navigation.goBack()}
          onChangeText={(text) => this.searchFunc(text)}
        />
        <View style={styles.content}>

          <Section extraData={articles} sections={[{title: '', data: articles}]}
            refreshFunc={() => {}}
            itemFunc={(item, index) => {
              const image = `https://www.schneider-gmbh.com/produktbilder/${item.order_number}.jpg`
              return(
                <TouchableOpacity key={index} style={styles.view} onPress={() => {
                   this.props.navigation.navigate('Details', { item })
                }}>
                  <Image style={styles.image} source={_.size(image) === 0 ? require('../../img/noimage.png') : {uri: image}} resizeMode={'contain'}/>
                  <Text style={styles.title}>{lang === 'de' ? item.name.de : item.name.en}</Text>
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
    // borderWidth: 1,
    // borderColor: '#eee'
  },

})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps)(ListProducts);
