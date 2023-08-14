import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
import NewsList from '../components/NewsList'
import { fetchNewsData } from '../redux/actions/NewsReducerActions'

const Dashboard = () => {

    const dispatch = useDispatch()
    const isDarkMode = useColorScheme() === 'dark';
    const newsReducerData = useSelector(state => state.NewsReducer.newsData)
    const [newsData, setNewsData] = useState([])
    const [isRefreshing, setRefreshing] = useState(false);

    const backgroundStyle = {
        backgroundColor: isRefreshing ? '#3395ff' : '#FFFFFF',
    };

    useEffect(() => {
        dispatch(fetchNewsData())
        return () => {
        }
    }, [])

    useEffect(() => {
        console.log("------------- updated newsReducerData ", newsReducerData)
        let slicedArray = newsReducerData?.slice(0, 10);
        setNewsData(slicedArray)
        setRefreshing(false);
    }, [newsReducerData])

    useEffect(() => {
        console.log("------------- updated newsData ", newsData)
    }, [newsData])

    /**
     * onPullToRefresh(): Actions to be performed on calling pull to refresh
     * @author VIVEK PS
     */
    const onPullToRefresh = () => {
        setRefreshing(true);
        console.log("------------ isRefreshing")
        dispatch(fetchNewsData())
    };


    /**
     * onDelete(): Actions to be performed on pressing delete icon
     * @param {*} item 
     * @author VIVEK PS
     */
    const onDelete = (item) => {
        console.log("----------- onDelete ", item)
    }


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} tintColor="#fff" />}
            >
                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <View style={styles.refreshButtonContainer} >
                        <Text>Latest Headlines</Text>
                        <TouchableOpacity onPress={() => {
                            dispatch(fetchNewsData())
                        }}>
                            <Icon name="refresh" size={22} />
                        </TouchableOpacity>
                    </View>

                    <NewsList newsData={newsData} onDelete={onDelete} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: 'white'
    },
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
    mainView: {

    },
    refreshButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor:'red',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
})