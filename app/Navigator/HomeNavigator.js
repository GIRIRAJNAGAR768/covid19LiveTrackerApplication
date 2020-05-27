import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Share, Linking } from 'react-native';
import Home from '../Home/Home'
import Country from '../Country/Country'
import India from '../Country/India'
import State from '../Country/State'
import Dist from '../Country/Dist'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'

const defaultNavOpt = title => {
  return {
    navigationOptions: {
      title: title,
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: "400",
        textAlign: title == "Home" ? 'center' : 'left',
        fontSize: 20,
      },
    },
  }
}



const Stack = createStackNavigator();

const share = async () => {
  try {
    const result = await Share.share({
      message:
        'Real covid 19 tracker android app..let\'s check how many active cases are there in your area. Download Now!\n\nAndroid:\nhttps://play.google.com/store/apps/details?id=girisofts.covid.tracker',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
  }
}

function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home">
        {/* <Stack.Screen name="home" component={Home} options={defaultNavOpt('Home').navigationOptions} /> */}
        <Stack.Screen name="home" component={Home} options={{
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: "700",
            textAlign: 'center',
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }}
              onPress={() => {
                share()
              }}>
              <Icon name={"md-share"} size={35} color={'white'} />
            </TouchableOpacity>
          ),

          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }}
              onPress={() => { Linking.openURL("https://play.google.com/store/apps/details?id=girisofts.covid.tracker") }}>
              <Icon name={"md-star"} size={35} color={'white'} />
            </TouchableOpacity>
          ),
        }} />
        <Stack.Screen name="country" component={Country} options={defaultNavOpt('Country').navigationOptions} />
        <Stack.Screen name="india" component={India} options={defaultNavOpt('India').navigationOptions} />
        <Stack.Screen name="state" component={State} options={defaultNavOpt('India/State').navigationOptions} />
        <Stack.Screen name="dist" component={Dist} options={defaultNavOpt('/State/District').navigationOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default HomeNavigator;
