
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button, RefreshControl, TouchableOpacity, Dimensions, FlatList } from 'react-native';
// import axios from 'axios'
import HomeBlocks from '../Components/Home/HomeBlocks'
// import Modal from 'react-native-modal';
// import {banner,inter,native} from '../Components/AdIds/AdIds'
// import { 
//   AdMobBanner, 
//   AdMobInterstitial, 
// } from 'react-native-admob'

const { height, width } = Dimensions.get('window')

class Dist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.item,
      lastUpdate: this.props.route.params.lastUpdate,
      distName: this.props.route.params.distName,
      stateName: this.props.route.params.stateName,
    };
  }



  render() {


    const { data } = this.state

    return (
      <ScrollView >

        <View style={styles.container}>

          <Text style={styles.head}>{this.state.stateName + '/' + this.state.distName}</Text>
          <Text style={{ textAlign: "center", fontSize: 18 }}>---Last update Time---</Text>
          <Text style={{ textAlign: "center", fontSize: 16, color: "green", marginBottom: 50 }}>{this.state.lastUpdate}</Text>

          {/* <View style={{ marginBottom: 10 }}>
            <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
          </View> */}


          <HomeBlocks head={"Total Confirmed Cases"} value={data && data.confirmed} color={'green'} />
          <HomeBlocks head={"Total Active"} value={data && data.active} color={'purple'} />

          <HomeBlocks head={"Total Recovered"} value={data && data.recovered} color={'blue'} />
          <HomeBlocks head={"Total Deceased"} value={data && data.deceased} color={'red'} />

          {/* <View style={{ marginVertical: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
            <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
          </View> */}


        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingTop: 10,
  },
  head: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center'
  },
  modal: {
    width: width,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    width: width * 0.93,
    height: "50%",
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  itemBlock: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
    width: '95%',
    height: '80%',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
})

export default Dist;
