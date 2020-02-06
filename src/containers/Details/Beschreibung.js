
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import _ from 'lodash'

const { width } = Dimensions.get('window')

class Beschreibung extends Component {
  constructor(props){
    super(props)
    this.state = {
      height: 0
    }
  }
  onNavigationStateChange(navState) {
    console.log(navState)
    this.setState({
      height: navState.loading ? 0 : navState.title
    });
  }
  render() {
    const { data, props } = this.props;
    const { KATALOG, ALS_PDF, BITTE, HEIGHT_VOLUME, ARTIKEL, EAN, LIEFEREINHEIT, SEITE } = props.language.lang
    const { lang } = props.main
    const data_empty = data ? true : false
    const html = !data_empty ? null : lang === 'de' ? data.description_long.description_long_de : data.description_long.description_long_en
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);true`
    const script = `<script>window.location.hash = 1;document.title = document.getElementsByTagName('table')[0].scrollHeight;</script>`;
    let content = html;
    const tables = html ? html.match(/(<table(?:.|\n)*?<\/table>)/g) : []
    const tables_map = tables ? tables.map((table) => {
      content = content.replace(table, '');
    }) : []
    // console.log(content)
    return (
      <View style={styles.container}>

        <View style={{padding: 16}}>
          {html ? <HTMLView value={content}  /> : null}
          {html && _.size(tables) ?
            tables.map((item, i) => {
              return(
                <WebView key={i}
                  automaticallyAdjustContentInsets={false}
                  style={[styles.webView, {height: Number(this.state.height), width: width - 32, fontSize: 14, paddingHorizontal: 24, alignSelf: 'center'}]}
                  source={{html: item + script}}
                  onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                  injectedJavaScript={INJECTEDJAVASCRIPT}
                  scrollEnabled={true}
                />
              )
            })
            : null
          }
        </View>

        {/*  <Text style={styles.pdf} onPress={() => alert('PDF')}>{ALS_PDF}</Text> */}

        {!data_empty ? null : data.variant.variant_de || data.variant.variant_en ?
          <View style={styles.picker}>
            <Text style={styles.picker_title}>{BITTE}:</Text>
            <Text style={styles.picker_text}>{lang === 'de' ? data.variant.variant_de : data.variant.variant_en}:</Text>
            {/* <Image style={styles.picker_icon} source={require('../../img/arrow.png')} resizeMode={'contain'} /> */}
          </View>
          :
          null
        }

        {/*data.variant_value_de || data.variant_value_en ?
          <Text style={styles.subtitle}>{HEIGHT_VOLUME}:</Text>
          : null
        */}

        {data.variant_value_de || data.variant_value_en ?
          <View style={styles.sub_picker}>
            <Text style={styles.sub_picker_title}>{lang === 'de' ? data.variant_value_de : data.variant_value_en}</Text>
          </View>
          : null
        }

        <View style={styles.block}>
          <View style={styles.row}>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={styles.col_title}>{ARTIKEL}</Text>
            </View>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={[styles.col_title, styles.black]}>{data.order_number}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.col]}>
              <Text style={styles.col_title}>{EAN}</Text>
            </View>
            <View style={[styles.col]}>
              <Text style={[styles.col_title]}>{data.ean}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={styles.col_title}>{LIEFEREINHEIT}</Text>
            </View>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={[styles.col_title]}>{data.deliverunit}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={[styles.col_title, styles.orange]}>{KATALOG} {""}</Text>
            </View>
            <View style={[styles.col, styles.col_gray]}>
              <Text style={[styles.col_title]}>{SEITE} {data.catalog_page}</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16
  },
  title: {
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 24
  },
  text: {
    color: '#000',
    paddingHorizontal: 16,
    fontSize: 12,
    paddingVertical: 4
  },
  pdf: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    padding: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0"
  },
  picker: {
    paddingHorizontal: 24,
    marginVertical: 16
  },
  picker_title: {
    color: '#000',
    fontSize: 12,
  },
  picker_text: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12,
    marginTop: 4
  },
  picker_icon: {
    width: 10,
    height: 10
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 14,
    paddingHorizontal: 24
  },
  sub_picker: {
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 8,
    borderRadius: 5,
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  sub_picker_title: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12
  },
  block: {
    marginHorizontal: 24,
    marginVertical: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 30,
    maxHeight: 30,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: '#ebedee'
  },
  col_gray: {
    backgroundColor: '#f2f2f2',
  },
  col_title: {
    fontSize: 12,
    color: '#666'
  },
  black: {
    color: '#000'
  },
  orange: {
    color: '#f5a32e'
  }
})
export default Beschreibung
