import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NewsList = ({ newsData, onRefresh }) => {

    const renderItem = ({ item, index }) => {
        console.log("------------ item ", item)
        console.log("------------ index ", index)
        return (
            <View style={styles.renderItem}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                style={styles.flatList}
                data={newsData}
                renderItem={renderItem}
                initialNumToRender={10}
                keyExtractor={(item, index) => index.toString()}
                // refreshing={}
                // onRefresh={onRefresh}
            />
        </View>
    )
}

export default NewsList

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        backgroundColor: 'grey'
    },
    renderItem: {
        height: 30,
        marginHorizontal: 25,
        marginVertical: 7
    }
})