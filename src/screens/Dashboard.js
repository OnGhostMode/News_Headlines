import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
import NewsList from '../components/NewsList'
import { fetchNewsData } from '../redux/actions/NewsReducerActions'

const Dashboard = () => {

    const isDarkMode = useColorScheme() === 'dark';
    const [newsData, setNewsData] = useState([])
    const dispatch = useDispatch()
    const newsReducerData = useSelector(state => state.NewsReducer.newsData)

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(() => {
        dispatch(fetchNewsData())
        return () => {
        }
    }, [])

    useEffect(() => {
        console.log("------------- updated newsReducerData ", newsReducerData)
        setNewsData(newsReducerData)
    }, [newsReducerData])

    useEffect(() => {
        console.log("------------- updated newsData ", newsData)
    }, [newsData])

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <TouchableOpacity onPress={() => {
                        dispatch(fetchNewsData())
                    }}>
                        <Text>testing</Text>
                    </TouchableOpacity>

                    <NewsList
                        newsData={newsData}
                        onRefresh={() => {
                            dispatch(fetchNewsData())
                        }}
                    />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
})