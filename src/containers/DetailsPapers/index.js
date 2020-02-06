
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import _ from 'lodash'

import { Section, Header } from '../../components'
import BottomBar from '../BottomBar'

const { width, height } = Dimensions.get('window')

class DetailsPapers extends Component {
  render() {
    const { lang, data_papers_scales, data_papers_registers, data_papers_wood, data_papers_fax, data_papers_rolls, data_papers_labels, data_papers_thermal } = this.props.main
    const { PAPIERE, DP_TITLE, DP_TEXT, DP_SUBTITLE_1, DP_SUBTITLE_2, DP_SUBTITLE_3, DP_SUBTITLE_4, DP_SUBTITLE_5, DP_SUBTITLE_6, DP_SUBTITLE_7 } = this.props.language.lang
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={PAPIERE} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1000, 1000, require('../../img/papers_1.jpg'))}

            <View style={styles.block}>
              <Text style={styles.title_top}>{DP_TITLE}</Text>
              <Text style={styles.text}>{DP_TEXT}</Text>
            </View>

            {this.renderTables(data_papers_scales, DP_SUBTITLE_1, null)}
            {this.renderTables(data_papers_registers, DP_SUBTITLE_2, require('../../img/dp_small_1.jpg'))}
            {this.renderTables(data_papers_wood, DP_SUBTITLE_3, require('../../img/dp_small_2.jpg'), true)}
            {this.renderTables(data_papers_fax, DP_SUBTITLE_4, require('../../img/dp_small_3.jpg'), true, true)}
            {this.renderTables(data_papers_rolls, DP_SUBTITLE_5, require('../../img/dp_small_4.jpg'), true, false, true)}
            {this.renderTables(data_papers_labels, DP_SUBTITLE_6, require('../../img/dp_small_5.jpg'), true)}
            {this.renderTables(data_papers_thermal, DP_SUBTITLE_7, require('../../img/dp_small_6.jpg'), false, true, false, true)}

          </ScrollView>
        </View>
        <BottomBar />
      </View>
    );
  }
  resizeFunc(w, h, source){
    const del = w / width
    const new_height = h / del
    return(
      <Image style={{width: width, height: new_height}} source={source} resizeMode={'stretch'} />
    )
  }
  renderTables(data, title, source, suit_bool, color_bool, quality_bool, roll_bool){
    return(
      <View style={styles.block}>
        <Text style={styles.subtitle}>{title}</Text>
        {source ? <Image style={styles.image_small} source={source} resizeMode={'contain'} /> : null}
        <View style={styles.row}>
          <Text style={[styles.row_title, styles.flex_small]}>{'Art.-Nr. code'}</Text>
          {quality_bool ? <Text style={[styles.row_title, styles.flex_small]}>{'Qualität / quality'}</Text> : null}
          <Text style={[styles.row_title, styles.flex_big]}>{'Abmessungen / dimensions'}</Text>
          {suit_bool ? null : <Text style={[styles.row_title, styles.flex_med]}>{'passend für / suitable for'}</Text>}
          {color_bool ? null : <Text style={[styles.row_title, styles.flex_small]}>{'Farbe / colour'}</Text>}
          {roll_bool ? <Text style={[styles.row_title, styles.flex_small]}>{'Stk./Rolle / labels/roll'}</Text> : null}
          <Text style={[styles.row_title, styles.flex_small]}>{'VE / unit'}</Text>
        </View>

        {data.map((item, i) => {
          const bool = (i % 2) === 0
          return(
            <View key={i} style={[styles.row, { backgroundColor: bool ? '#eee' : 'transparent' }]}>
              <Text style={[styles.row_text, styles.flex_small]}>{item.code}</Text>
              {quality_bool ? <Text style={[styles.row_text, styles.flex_small]}>{item.quality}</Text> : null}
              <Text style={[styles.row_text, styles.flex_big]}>{item.dimensions}</Text>
              {suit_bool ? null : <Text style={[styles.row_text, styles.flex_med]}>{item.suitable}</Text>}
              {color_bool ? null : <Text style={[styles.row_text, styles.flex_small]}>{item.color}</Text>}
              {roll_bool ? <Text style={[styles.row_text, styles.flex_small]}>{item.roll}</Text> : null}
              <Text style={[styles.row_text, styles.flex_small]}>{item.unit}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1
  },
  block: {
    flex: 1,
    marginBottom: 32
  },
  title_top: {
    backgroundColor: '#eee',
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: 'center'
  },
  text: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subtitle: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row_title: {
    color: '#000',
    fontSize: 14,
    margin: 3,
    textAlign: 'center'
  },
  row_text: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    margin: 3,
    textAlign: 'center'
  },
  flex_small: {
    flex: 0.4
  },
  flex_big: {
    flex: 1,
  },
  flex_med: {
    flex: 0.7
  },
  image_small: {
    width: '100%',
    height: 150
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
  }
}

export default connect(mapStateToProps)(DetailsPapers);
