import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class HomeBlocks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            head: this.props.head,
            value: this.props.value,
            color: this.props.color
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.head}>{this.state.head}</Text>
                <Text style={{ ...styles.subHead, color: this.state.color }}>{this.state.value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    head: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 20,
        fontWeight: 'bold'
    },
    subHead: {
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
    }
})

export default HomeBlocks
