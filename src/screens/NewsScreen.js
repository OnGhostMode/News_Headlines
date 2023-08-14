import { Dimensions, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const NewsScreen = ({ route }) => {
    const { item } = route.params;
    const [dateTime, setDatetime] = useState('')

    useEffect(() => {
        let timestemp = moment(item.publishedAt).utc().format('YYYY-MM-DD HH:mm:ss')
        setDatetime(timestemp)
        return () => {
        }
    }, [])

    return (
        <ScrollView style={styles.mainView} >
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../resources/placeholder_image.jpeg')} resizeMode="cover" style={styles.imageBackground}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.urlToImage } || require('../resources/placeholder_image.jpeg')}
                        defaultSource={require('../resources/placeholder_image.jpeg')}
                        loadingIndicatorSource={require('../resources/placeholder_image.jpeg')}
                    />
                </ImageBackground>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.dateTime}>{dateTime}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.authorContainer}>
                    <Text style={styles.source}>Source: {item?.source?.name}</Text>
                    <Text style={styles.author}>- {item.author || 'Author'}</Text>
                </View>

                <TouchableOpacity style={styles.externalLink} onPress={() => {
                    Linking.openURL(item.url)
                }}>
                    <Text style={styles.webLink}>Open in browser</Text>
                    <Icon name="external-link-alt" size={16} color="#3395ff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'lightgrey',
        overflow: 'hidden',

    },
    dateTime: {
        color: 'grey',
        fontSize: 10,
        fontWeight: 'bold',
        flex: 1,
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        marginVertical: 5
    },
    content: {
        color: '#5A5A5A',
        fontSize: 16,
        marginVertical: 10,
        lineHeight:25
    },
    description: {
        color: '#5A5A5A',
        fontSize: 16,
        // flex: 1,
        marginVertical: 10,
        lineHeight:25
    },
    authorContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10
    },
    author: {
        color: '#828282',
        fontSize: 12,
        fontWeight: 'bold',
        // flex: 1,
        // alignSelf: 'flex-end',
        // backgroundColor:'red'
    },
    source: {
        color: '#828282',
        fontSize: 14,
        fontWeight: 'bold',
        // flex: 1,
        // alignSelf: 'flex-start',
        // backgroundColor:'red'
    },
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    image: {
        width: width,
        height: 180,
        flex: 1,
        resizeMode: 'cover',


    },
    detailsContainer: {
        flex: 1,
        padding: 10,
        // backgroundColor: 'red',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#F2F2F2'
    },
    deleteIconRow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        zIndex: 999,
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    webLink: {
        fontSize: 16,
        marginRight: 10
    },
    externalLink: {
        flexDirection: 'row',
        marginVertical: 10
    }
})