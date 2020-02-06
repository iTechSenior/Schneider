import React from "react";
import { Button, View, Text, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(Thunk));

import rootReducer from './src/rootReducer';

import { Home, Welcome, Products, ListProducts, Details, SideBar, AboutUs, Memo, Papers, Kontact, DetailsPapers, Anfrage, Impressum, Datenschutz } from './src'

const HomeStack = createStackNavigator({
  Home, Products, ListProducts, Details, Papers, Memo, Kontact, DetailsPapers, Anfrage, AboutUs, Impressum, Datenschutz
},{ defaultNavigationOptions: { gesturesEnabled: false, header: null } });

const MyDrawerNavigator = createDrawerNavigator({
  Welcome: Welcome,
  Main: HomeStack,
},{ contentComponent: (props) => (<SideBar {...props} />) });

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
