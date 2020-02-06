
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
import BottomBar from '../BottomBar'

class Service extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation)
    return {
      headerTitle: (state) => {
        const title = navigation.getParam('title')
        return(
          <Text style={styles.title}>{title}</Text>
        )
      },
      headerLeft: (
        <TouchableOpacity style={styles.back_btn} onPress={() => navigation.popToTop()}>
          <Image style={styles.back_img} source={require('../../img/back_icon.png')} />
        </TouchableOpacity>
      ),
      headerRight: (<View style={styles.back_btn} />),
    }
  }
  componentDidMount(){
    const { SERVICE } = this.props.language.lang
    this.props.navigation.setParams({ 'title': SERVICE })
  }
  render() {
    const { ABOUT_US, MESSEN } = this.props.language.lang
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView>

            <TouchableOpacity style={styles.view} onPress={() => this.props.navigation.navigate("Events")}>
              <Image style={styles.image} source={require('../../img/bg_events.jpg')} resizeMode={"stretch"} />
              <View style={styles.orange_block}>
                <Text style={styles.orange_text}>{MESSEN}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.view} onPress={() => this.props.navigation.navigate("AboutUs")}>
              <Image style={styles.image} source={require('../../img/bg_about.jpg')} resizeMode={"stretch"} />
              <View style={styles.orange_block}>
                <Text style={styles.orange_text}>{ABOUT_US}</Text>
              </View>
            </TouchableOpacity>

            <View style={{height: 32}} />
          </ScrollView>
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
  back_btn: {
    padding: 10
  },
  back_img: {
    width: 20,
    height: 20
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
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#eee'
  },
  orange_block: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ef7d00',
    position: 'absolute',
    zIndex: 1,
  },
  orange_text: {
    color: '#fff',
    fontSize: 14
  },
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps)(Service);
