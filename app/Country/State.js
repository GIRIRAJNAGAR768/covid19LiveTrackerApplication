import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button, RefreshControl, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import axios from 'axios'
import HomeBlocks from '../Components/Home/HomeBlocks'
import Modal from 'react-native-modal';
// import {banner,inter,native} from '../Components/AdIds/AdIds'
// import { 
//   AdMobBanner, 
//   AdMobInterstitial, 
// } from 'react-native-admob'

// AdMobInterstitial.setAdUnitID(inter);

const { height, width } = Dimensions.get('window')

class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name : this.props.route.params.name,
      data: this.props.route.params.item,
      name: "India",
      actInd: false,
      upDate: "",
      distList: [],
      distData: {},
      error: false,
      refreshing: false,
      modalVis: false,
    };
  }

  componentDidMount() {
    this.apiCall()
  }

  apiCall = async () => {
    this.setState({ actInd: true });
    const { data } = this.state

    let url = "https://api.covid19india.org/state_district_wise.json"


    await axios.get(url)
      .then(response => {

        if (response && response.data && response.data) {


          Object.entries(response.data).some(([key, value]) => {


            if (key + "" == data.state + "") {

              let distList = []
              let distData = []
              Object.entries(value.districtData).forEach(([key, value]) => {
                if (key + "" != "Unknown") {
                  distList.push(key)
                  distData.push(value)
                }
              })
              this.setState({ actInd: false, distList: distList, distData: distData, error: false })


              return true
            }


          });



        }


      })
      .catch(error => {
        console.log(error)
        this.setState({ actInd: false, error: true })
      });
  }

  _onRefresh = () => {

    this.setState({ refreshing: true })
    setTimeout(
      function () {
        this.setState({ refreshing: false })
        this.apiCall();
      }.bind(this),
      500,
    );
  }

  distPressed = (item, distName) => {
    // AdMobInterstitial.requestAd()
    // AdMobInterstitial.showAd()
    const { data } = this.state
    this.props.navigation.navigate("dist", { item: item, lastUpdate: data && data.lastupdatedtime, distName: distName, stateName: data && data.state })
    this.setState({ modalVis: false })
  }

  render() {


    const { data, distData } = this.state
    // console.log("data",data)

    return (
      this.state.actInd ?

        <View style={{ justifyContent: 'center', height: "100%" }}>
          <ActivityIndicator size="large" color="black" />
        </View>

        :
        (
          this.state.error
            ?
            <View style={{ justifyContent: 'center', height: "100%", alignItems: 'center' }}>
              <Text>Error...</Text>
              <Text>Something Went Wrong</Text>
              <Button title="Refresh" onPress={() => this.apiCall()} />
            </View>
            :

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this._onRefresh()}
                />
              }>

              <Modal
                cancel="true"
                visible={this.state.modalVis}
                animationType={'slide'}
                backgroundColor={'rgba(0,0,0,0.5)'}
                style={styles.modal}>
                <View style={styles.modalView}>
                  <Text style={styles.text}>Select District</Text>
                  <View style={{ height: 1, backgroundColor: 'gray' }}></View>
                  <View style={styles.itemBlock}>
                    <View style={{ marginBottom: 10, alignSelf: 'center', marginTop: 5 }}>
                      {/* <AdMobBanner
                            bannerSize="banner"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} /> */}
                    </View>
                    <FlatList
                      contentContainerStyle={{ paddingVertical: 10 }}
                      data={this.state.distList}
                      renderItem={({ item, index }) =>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.distPressed(distData[index], item)}>
                          <View style={{ paddingVertical: 10, borderRadius: 5, backgroundColor: 'white', margin: 2, width: width * 0.7, alignSelf: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}>{item}</Text>
                          </View>
                        </TouchableOpacity>

                      }


                    />
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ modalVis: false }) }}
                      style={{ alignSelf: 'center', backgroundColor: 'purple', padding: 10, width: '80%', marginBottom: 10, marginTop: 10, borderRadius: 5 }}>
                      <Text style={{ textAlign: 'center', fontSize: 16, color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>

                  </View>

                </View>

              </Modal>


              <View style={styles.container}>

                <Text style={styles.head}>{data.state}</Text>
                <Text style={{ textAlign: "center", fontSize: 18 }}>---Last update Time---</Text>
                <Text style={{ textAlign: "center", fontSize: 16, color: "green", marginBottom: 50 }}>{data && data.lastupdatedtime}</Text>

                {/* <View style={{ marginBottom: 10 }}>
                  <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
                </View> */}

                <HomeBlocks head={"Total Confirmed Cases"} value={data && data.confirmed} color={'green'} />
                <HomeBlocks head={"Total Active"} value={data && data.active} color={'purple'} />


                <HomeBlocks head={"Total Recovered"} value={data && data.recovered} color={'blue'} />
                <HomeBlocks head={"Total Deaths"} value={data && data.deaths} color={'red'} />
                {/* <View style={{ marginVertical: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                  <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
                </View> */}

                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ modalVis: true }) }}
                  style={{ backgroundColor: 'purple', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingVertical: 20, borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: '700' }}>View Details By District</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
        )
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
    height: "70%",
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

export default State;