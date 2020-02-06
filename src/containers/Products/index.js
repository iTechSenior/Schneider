
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'

import { Section, Header } from '../../components'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')

class Products extends Component {
  constructor(props){
    super(props)
    const { CAT_1, CAT_2, CAT_3, CAT_4, CAT_5, CAT_6, CAT_7, CAT_8, CAT_9, CAT_10, CAT_11, CAT_12, CAT_13, CAT_14, CAT_15, CAT_16, CAT_17 } = this.props.language.lang
    const new_categories = [CAT_1, CAT_2, CAT_3, CAT_4, CAT_5, CAT_6, CAT_7, CAT_8, CAT_9, CAT_10, CAT_11, CAT_12, CAT_13, CAT_14, CAT_15, CAT_16, CAT_17]
    this.state = {
      categories: [],
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
      url: `https://www.schneider-gmbh.com/${lang}/api_v2/4cdaaab7ad0ce698d02494542e8f6111/categories`,
      method: 'get'
    }).then((res) => {
      const data = res.data.categories
      console.log(res)
      this.setState({categories: data, data_search: data})
    }).catch((err) => console.log(err))
  }
  searchFunc(text){
    const { lang } = this.props.main
    const { data_search } = this.state;
    const textData = text.toUpperCase()
    const newData = data_search.filter((item) => {
      const name_de = item && item.name ? item.name.de.toUpperCase() : ''
      const name_en = item && item.name ? item.name.en.toUpperCase() : ''
      return lang === 'de' ? name_de.indexOf(textData) > -1 : name_en.indexOf(textData) > -1
    })
    this.setState({search_text: text, categories: newData})
  }
  render() {
    const { PRODUTKE } = this.props.language.lang
    const { lang } = this.props.main
    const { categories, search_text } = this.state
    const data_cat = [
      "kuechenzubehoer-utensilien", "pizza-zubehoer", "messer", "transportieren-lagern", "backen", "backformen", "silikon-backformen", "ausstecher", "fachgeraete",
      "dosiermaschinen-gebaeckfueller", "thermometer", "arbeitsschutz-reinigung", "dekorieren", "lebensmittelfarben", "praesentieren", "schokolade", "eis"
    ]
    return (
      <View style={styles.container}>
        <Header title={PRODUTKE} search_text={search_text} props={this.props}
          onPressLeft={() => this.props.navigation.goBack()}
          onChangeText={(text) => this.searchFunc(text)}
        />
        <View style={styles.content}>
          <Section extraData={categories} sections={[{title: '', data: categories}]}
            refreshFunc={() => {}}
            itemFunc={(item, index) => {
              const product_name = lang === 'de' ? item.name.de : item.name.en
              return(
                <TouchableOpacity key={index} style={styles.view} onPress={() => {
                  this.props.navigation.navigate('ListProducts', { product_name: product_name, product_item: item })
                }}>
                  <Text style={[styles.title_pr, { alignSelf: 'center' }]}>{product_name}</Text>
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
  view: {
    flex: 1,
    height: width / 3,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linearGradient: {
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  title_pr: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 24,
    // maxWidth: 180,
    // height: 50
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginVertical: 24
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5a32e'
  },
  btn_title: {
    color: "#fff",
    fontSize: 12
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Products);
