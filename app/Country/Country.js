import React, { Component } from 'react';
import { View, Text,StyleSheet,ActivityIndicator,ScrollView,Button,RefreshControl } from 'react-native';
import axios from 'axios'
import HomeBlocks from '../Components/Home/HomeBlocks'
// import {banner,inter,native} from '../Components/AdIds/AdIds'

// import { 
//   AdMobBanner, 
// } from 'react-native-admob'
 
class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : this.props.route.params.name,
        actInd:false,
        upDate:"",
        data:{},
        error:false,
        refreshing:false
    };
  }

   componentDidMount() {
      
    this.apiCall()
  }

  apiCall = async() => {
    this.setState({actInd:true});

    const {name} = this.state

    let url = "https://covid19.mathdro.id/api/countries/"+name

    await axios.get(url)
    .then(response =>
        {
            if(response && response.data)
            {
                this.setState({actInd: false,data:response.data,error:false})
            }
           
         
        })
    .catch(error => {
        this.setState({actInd: false,error:true})
    });
  }

  _onRefresh = () => {
        
    this.setState({refreshing:true})
    setTimeout(
      function () {
        this.setState({refreshing:false})
        this.apiCall();
      }.bind(this),
      500,
    );
  }

  render() {


    const {data} = this.state

    return (
        this.state.actInd ? 

        <View style = {{justifyContent:'center',height:"100%"}}>
         <ActivityIndicator size = "large" color ="black"/>
        </View>

        :
        (
            this.state.error
            ?
                <View style = {{justifyContent:'center',height:"100%",alignItems:'center'}}>
                    <Text>Error...</Text>
                    <Text>Something Went Wrong</Text>
                    <Button title ="Refresh" onPress = {()=> this.apiCall()}/>
                </View>
            :
        
        <ScrollView 
         refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=>this._onRefresh()}
            />
          }>
             <View style = { styles.container}>
                   
                <Text style = { styles.head}>{this.state.name}</Text>
                   <Text style = {{textAlign:"center",fontSize:18}}>---Last update at---</Text>
                   <Text style = {{textAlign:"center",fontSize:16,color:"green",marginBottom:50}}>{data && data.lastUpdate &&data.lastUpdate.substring(0,19)}</Text>

                        {/* <View style = {{marginBottom:10}}>
                        <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
                        </View> */}
                   
                   <HomeBlocks head = {"Total Confirmed Cases"} value ={data && data.confirmed && data.confirmed.value} color = {'green'}/>
                   <HomeBlocks head = {"Total Recovered"} value ={data && data.recovered && data.recovered.value} color = {'blue'}/>
                   <HomeBlocks head = {"Total Deaths"} value ={data && data.deaths && data.deaths.value} color = {'red'}/>
                   {/* <View style = {{marginVertical:5, justifyContent:'center',alignSelf: 'center',alignItems: 'center'}}>
                   <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID={banner+""}
                            didFailToReceiveAdWithError={error=>{}} />
                        </View> */}


               </View>
        </ScrollView>
        )
    );
  }
}

const styles  = StyleSheet.create({
   
        container: {
            justifyContent: 'center',
            backgroundColor:'rgba(0,0,0,0.1)',
            paddingTop:10,
        },
        head:{
            textAlign: 'center',
            marginVertical:10,
            fontSize:20,
            fontWeight:'bold',
        },
})

export default Country;
