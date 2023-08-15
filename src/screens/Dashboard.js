import React, { useEffect, useState } from 'react'
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useDispatch, useSelector } from 'react-redux'
import NewsList from '../components/NewsList'
import { fetchNewsData, updateNewsData } from '../redux/actions/NewsReducerActions'

const Dashboard = () => {

    const dispatch = useDispatch()
    const isDarkMode = useColorScheme() === 'dark';
    const newsReducerData = useSelector(state => state.NewsReducer.newsData)
    const [newsData, setNewsData] = useState([])
    const [isRefreshing, setRefreshing] = useState(false);
    const [timerReset, setTimerReset] = useState(1);
    const [hasRefreshCalled, setRefreshCalled] = useState(false);

    /**
     * backgroundStyle(): Dynamic background style on pull to refresh
     */
    const backgroundStyle = {
        flex: 1,
        backgroundColor: isRefreshing ? '#3395ff' : '#FFFFFF',
    };

    /**
     * Initializes states on update of redux
     * @author VIVEK PS
     */
    useEffect(() => {
        try {
            newsReducerDataTemp = newsReducerData
            let slicedArray = newsReducerDataTemp?.slice(0, 10);
            setNewsData(slicedArray)
        } catch (error) {
            console.log("------------- useeffect error ", error)
        }
    }, [])

    /**
     * Initializes states on update of redux
     * @author VIVEK PS
     */
    useEffect(() => {
        try {
            if(hasRefreshCalled){
            newsReducerDataTemp = newsReducerData
            let slicedArray = newsReducerDataTemp?.slice(0, 10);
            setNewsData(slicedArray)
            setRefreshCalled(false)
            }
            setRefreshing(false);
            setTimerReset(Math.random(12))
        } catch (error) {
            console.log("------------- useeffect error ", error)
        }
    }, [newsReducerData])

    /**
     * onPullToRefresh(): Actions to be performed on calling pull to refresh
     * @author VIVEK PS
     */
    const onPullToRefresh = () => {
        try {
            setTimerReset(Math.random(12))
            setRefreshing(true);
            dispatch(fetchNewsData())
            setRefreshCalled(true)
        } catch (error) {
            console.log("--------------- onPullToRefresh error ", error)
            setRefreshing(false)
        }
    };

    /**
     * onDelete(): Actions to be performed on pressing delete icon
     * @param {*} item 
     * @author VIVEK PS
     */
    const onDelete = async (item) => {
        let newsDataTemp = newsData
        let newsDataFiltered = await newsDataTemp.filter(newsItem => {
            return (
                newsItem?.title != item.title || newsItem?.author != item.author
            );
        })
        setNewsData(newsDataFiltered)

        let newsReducerDataTemp = newsReducerData
        let newsReducerDataFiltered = await newsReducerDataTemp.filter(newsItem => {
            return (
                newsItem?.title != item.title || newsItem?.author != item.author
            );
        })
        dispatch(updateNewsData(newsReducerDataFiltered))
    }

    /**
     * Calls refresh list data every 10 seconds
     * @author VIVEK PS
     */
    useEffect(() => {
        const intervalId = setInterval(() => {
            refreshListData()
        }, 10000)
        return () => {
            clearInterval(intervalId);
        };
    }, [timerReset])

    /**
     * refreshListData(): Updates the list data by adding 5 new items to the top
     * @author VIVEK PS
     */
    const refreshListData = async () => {
        try {
            let newsReducerDataTemp = newsReducerData
            const shuffled = [...newsReducerDataTemp].sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 5);
            let tempArray = []
            await selected.map((item) => {
                tempArray.push(item)
            })
            let newsDataTemp = newsData
            await newsDataTemp.map((item) => {
                tempArray.push(item)
            })
            setNewsData([...tempArray])
        } catch (error) {
            console.log("--------------- refreshListData error ", error)

        }
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
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => onPullToRefresh()} tintColor="#fff" />}
            >
                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <View style={styles.refreshButtonContainer} >
                        <Text>Latest Headlines</Text>
                        <TouchableOpacity onPress={() => {
                            onPullToRefresh()
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
        flex: 1,
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
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
})