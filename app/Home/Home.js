import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, FlatList, TouchableNativeFeedback, TouchableOpacity, RefreshControl, Button } from 'react-native'
import HomeBlocks from '../Components/Home/HomeBlocks'
import axios from 'axios'
import Modal from 'react-native-modal';
// import { banner, inter, native } from '../Components/AdIds/AdIds'
// import {
//     AdMobBanner,
//     AdMobInterstitial,
// } from 'react-native-admob'

const { height, width } = Dimensions.get('window')


export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            actInd: false,
            data: {},
            cont: [],
            modalVis: false,
            error: false,
            refreshing: false

        }
    }

    static navigationOptions = () => {
        title = "Home Page"
    }

    componentDidMount() {

        this.apiCall()



    }

    apiCall = async () => {
        this.setState({ actInd: true })

        let url = "https://covid19.mathdro.id/api"
        await axios.get(url)
            .then(response => {
                if (response && response.data) {
                    this.setState({ data: response.data })
                }

            })
            .catch(error => {
                this.setState({ actInd: false, error: true })
            });

        await axios.get("https://covid19.mathdro.id/api/countries")
            .then(response => {
                if (response && response.data && response.data.countries) {
                    this.setState({ actInd: false, cont: response.data.countries, error: false })
                }

            })
            .catch(error => {
                this.setState({ actInd: false, error: true })
            })
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

    countryPressed = (name) => {


        if (name == "India") {
            this.props.navigation.navigate("india")
        }
        else {
            this.props.navigation.navigate("country", { name: name })
        }

        this.setState({ modalVis: false })
    }

    render() {

        const { data } = this.state
        const { confirmed, recovered, deaths } = data
        let year, month, day, hour, minute, second;
        if (data && data.lastUpdate) {
            let date = data.lastUpdate
            year = date.slice(0, 4)
            month = date.slice(5, 7)
            day = date.slice(8, 10)
            hour = date.slice(11, 13)
            minute = date.slice(14, 16)
            second = date.slice(17, 19)

        }
        return (
            this.state.actInd ?
                (
                    <View style={{ justifyContent: 'center', height: "100%" }}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                )

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
                            }
                        >

                            <Modal
                                cancel="true"
                                visible={this.state.modalVis}
                                animationType={'slide'}
                                backgroundColor={'rgba(0,0,0,0.5)'}
                                style={styles.modal}>
                                <View style={styles.modalView}>
                                    <Text style={styles.text}>Select Country</Text>
                                    <View style={{ height: 1, backgroundColor: 'gray' }}></View>

                                    <View style={styles.itemBlock}>
                                        <View style={{ marginBottom: 10, alignSelf: 'center', marginTop: 5 }}>
                                            {/* <AdMobBanner
                                                bannerSize="banner"
                                                adUnitID={banner + ""}
                                                didFailToReceiveAdWithError={error => { }} /> */}
                                        </View>
                                        <FlatList
                                            contentContainerStyle={{ paddingVertical: 10 }}
                                            data={this.state.cont}
                                            renderItem={({ item, index }) =>

                                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.countryPressed(item.name)}>
                                                    <View style={{ paddingVertical: 10, borderRadius: 5, backgroundColor: 'white', margin: 2, width: width * 0.7, alignSelf: 'center' }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
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

                                <Text style={styles.head}>World Wide Report</Text>
                                <Text style={{ textAlign: "center", fontSize: 18 }}>---Last update Time---</Text>
                                <Text style={{ textAlign: "center", fontSize: 16, color: "green", marginBottom: 50 }}>
                                    {day + "/" + month + "/" + year + " T " + hour + ":" + minute + ":" + second}
                                </Text>

                                {/* <View style={{ marginBottom: 10 }}> */}
                                    {/* <AdMobBanner
                                        bannerSize="fullBanner"
                                        adUnitID={banner + ""}
                                        didFailToReceiveAdWithError={error => { }} /> */}
                                {/* </View> */}

                                <HomeBlocks head={"Total Confirmed Cases"} value={confirmed && confirmed.value} color={'green'} />
                                <HomeBlocks head={"Total Recovered"} value={recovered && recovered.value} color={'blue'} />
                                <HomeBlocks head={"Total Deaths"} value={deaths && deaths.value} color={'red'} />
                                <View style={{ marginVertical: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                    {/* <AdMobBanner
                                        bannerSize="mediumRectangle"
                                        adUnitID={banner + ""}
                                        didFailToReceiveAdWithError={error => { }} /> */}
                                </View>

                                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ modalVis: true }) }}
                                    style={{ backgroundColor: 'purple', marginBottom: 10, marginTop: 10, marginHorizontal: 10, paddingVertical: 20, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: '700' }}>View Details By Country</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    this.props.navigation.navigate("india")
                                }}
                                    style={{ backgroundColor: 'purple', marginBottom: 10, marginHorizontal: 10, paddingVertical: 20, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: '700' }}>India</Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                )

        )
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
        marginTop: 5,
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

export default Home
