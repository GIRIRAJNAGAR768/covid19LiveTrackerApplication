/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
// import Home from './app/Home/Home'
import HomeNavigator from './app/Navigator/HomeNavigator'
console.disableYellowBox = true;
class App extends React.Component {

  componentDidMount(){
    SplashScreen.hide()
  }

  render() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor = {'purple'} />
     
      
            <HomeNavigator />
    
     
    </>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
 
});

export default App;
