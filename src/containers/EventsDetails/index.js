
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window')
import BottomBar from '../BottomBar'

class EventsDetails extends Component {
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

            <View style={styles.view}>
              <Image style={styles.image} source={require('../../img/event_2.jpg')} resizeMode={"stretch"} />
            </View>

            <Text style={styles.subtitle}>Besuchen Sie uns vom 21.09.2019 - 24.09.2019 auf der Südback 2019 in Stuttgart.</Text>
            <Text style={styles.text}>Die südback ist eine der begehrtesten und wichtigsten Trendmessen für das Bäcker- und Konditorenhandwerk in Deutschland. Sie ist die Drehscheibe für den Austausch von Ideen, Meinungen und Informationen sowie für die Präsentation von Trends, Entwicklungen und technischen Innovationen. Das Bäcker-Trend-Forum, das Konditoren-Trend-Forum und der südback Trend Award erfreuen sich größter Beliebtheit. Die hohe Qualität der Forumsvorträge und das Schaubacken ziehen viele Fachbesucher an. Innovativen Produktentwicklungen werden in Hinsicht auf Technik, Design und Konzept durch den südback Trend Award prämiert.</Text>

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
  },
  subtitle: {
    padding: 16,
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  text: {
    padding: 24,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 14,
    lineHeight: 18,
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps)(EventsDetails);
