
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'

const { width } = Dimensions.get('window')

import { Header } from '../../components'
import BottomBar from '../BottomBar'

class Kontact extends Component {
  render() {
    const { lang } = this.props.main;
    const { KONTACT, KONTACT_TITLE, KONTACT_TEXT, KONTACT_SUBTITLE_1, KONTACT_SUBTITLE_2 } = this.props.language.lang
    const manager_1 = lang === 'en' ? "Sales Manager Germany" : "Vertriebsleitung Innendienst"
    const manager_2 = lang === 'en' ? "Area Sales Manager South" : "Gebietsleitung Süd"
    const manager_3 = lang === 'en' ? "Sales Manager West / North / East" : "Vertriebsleitung West / Nord / Ost "
    const manager_4 = lang === 'en' ? "Area Sales Manager North / East" : "Gebietsleitung Nord / Ost"
    const manager_5 = lang === 'en' ? "Sales Director Export" : "Exportleiter Weltweit"
    return (
      <View style={styles.container}>
        <Header hide_search={true} title={KONTACT} props={this.props} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView>
            {this.resizeFunc(1920, 780, require('../../img/bg_kontact.jpg'))}
            <Text style={styles.title_top}>{KONTACT_TITLE}</Text>
            <Text style={styles.text}>{KONTACT_TEXT}</Text>

            {this.subtitleRender(KONTACT_SUBTITLE_1)}

            <Text style={styles.address}>
              <Text style={{fontWeight: '500'}}>{`Schneider GmbH\n`}</Text>
              {`In der Längerts 1\nD-73095 Albershausen\n\nTelefon: +49 (0) 7161 - 3004-0\nTelefax: +49 (0) 7161 - 3004-50\n\nE-Mail: `}
              <Text style={{color: '#ef7d00'}}>{`info@schneider-gmbh.com`}</Text>
            </Text>

            {/*
              {this.subtitleRender(KONTACT_SUBTITLE_2)}

              {this.mapRender(require('../../img/map_1.jpg'), 'Andreas Mundorff', manager_1, "a.mundorff@schneider-gmbh.com")}
              {this.mapRender(require('../../img/map_2.jpg'), 'Andreas Mundorff', manager_2, "a.mundorff@schneider-gmbh.com", "Baden-Württemberg, Bayern")}
              {this.mapRender(require('../../img/map_3.jpg'), 'Christoph Schumacher', manager_3, "c.schumacher@schneider-gmbh.com", "Nordrhein-Westfalen, Hessen, Rheinland Pfalz, Saarland")}
              {this.mapRender(require('../../img/map_4.jpg'), 'Joe Steffen', manager_4, "j.steffen@schneider-gmbh.com", "Hamburg, Schleswig-Holstein, Mecklenburg-Vorpommern, Brandenburg, Berlin, Sachsen, Sachsen-Anhalt, Thüringen, Niedersachesen, Bremen")}

              <View style={styles.map_view}>
                <View style={styles.orange_block}>
                  <Text style={styles.map_title}>{"Ulrich Kolnik"}</Text>
                  <Text style={styles.map_text}>{manager_5}</Text>
                </View>
                <Text style={[styles.map_email_text, { fontWeight: '500' }]}>{`+49 (0) 7161 - 3004-23`}</Text>
                <Text style={styles.map_email}>{"u.kolnik@schneider-gmbh.com"}</Text>
              </View>
              */}

            <View style={{height: 32}} />
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
  subtitleRender(title){
    return(
      <View style={styles.subtitle_view}>
        <Text style={styles.subtitle}>{title}</Text>
        <View style={styles.line} />
      </View>
    )
  }
  mapRender(source, title, text, email, email_text){
    return(
      <View style={styles.map_view}>
        <Image style={styles.map_image} source={source} resizeMode={'contain'} />
        <View style={styles.orange_block}>
          <Text style={styles.map_title}>{title}</Text>
          <Text style={styles.map_text}>{text}</Text>
        </View>
        <Text style={styles.map_email}>{email}</Text>
        <Text style={styles.map_email_text}>{email_text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  block: {
    flex: 1,
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
  subtitle_view: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 16
  },
  subtitle: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  line: {
    width: 80,
    height: 1,
    backgroundColor: '#ef7d00'
  },
  address: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  map_view: {
    flex: 1,
    padding: 16,
    alignItems: 'center'
  },
  map_image: {
    width: '100%',
    height: 300
  },
  orange_block: {
    marginTop: 8,
    width: '50%',
    padding: 8,
    backgroundColor: '#ef7d00',
    alignItems: 'center'
  },
  map_title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'center'
  },
  map_text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  },
  map_email: {
    paddingVertical: 4,
    color: '#ef7d00',
    fontSize: 16
  },
  map_email_text: {
    paddingVertical: 4,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    main: state.main,
    language: state.language,
    home: state.home
  }
}

export default connect(mapStateToProps)(Kontact);
