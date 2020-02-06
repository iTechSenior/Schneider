
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
import BottomBar from '../BottomBar'

class Events extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (state) => {
        const title = navigation.getParam('title')
        return(
          <Text style={styles.title}>{title}</Text>
        )
      },
      headerLeft: (
        <TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
          <Image style={styles.back_img} source={require('../../img/back_icon.png')} />
        </TouchableOpacity>
      ),
      headerRight: (<View style={styles.back_btn} />),
    }
  }
  componentDidMount(){
    const { MESSEN } = this.props.language.lang
    this.props.navigation.setParams({ 'title': MESSEN })
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.content}>
          <ScrollView>

            <TouchableOpacity style={styles.view} onPress={() => this.props.navigation.navigate("EventsDetails")}>
              <Image style={styles.image} source={require('../../img/event_1.jpg')} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.view} onPress={() => this.props.navigation.navigate("EventsDetails")}>
              <Image style={styles.image} source={require('../../img/event_2.jpg')} resizeMode={"stretch"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.view} onPress={() => this.props.navigation.navigate("EventsDetails")}>
              <Image style={styles.image} source={require('../../img/event_3.jpg')} resizeMode={"stretch"} />
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
    height: width / 2.5,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10
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

export default connect(mapStateToProps)(Events);
