import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const NewsList = ({ newsData, onDelete }) => {
    const navigation = useNavigation();
    const [pinnedData, setPinnedData] = useState(null)

    /**
     * PinIcon(): Pin news icon UI component
     * @param {*} param0 
     * @returns 
     * @author VIVEK PS
     */
    const PinIcon = ({ onPress, isPinned }) => {
        return (
            <TouchableOpacity onPress={onPress} style={isPinned ? styles.pinIconActive : styles.pinIcon}>
                <Icon name="pin" size={22} color="white" />
            </TouchableOpacity>
        )
    }

    /**
     * onPin(): Actions to be performed on pressing pin icon
     * @param {*} item 
     * @author VIVEK PS
     */
    const onPin = (item) => {
        setPinnedData(item)
    }

    /**
     * onUnpin(): Actions to be performed on pressing pin icon
     * @param {*} item 
     * @author VIVEK PS
     */
    const onUnpin = () => {
        setPinnedData(null)
    }

    /**
     * openDetailsScreen(): Navigates to detailed news screen on pressing a card
     * @param {*} item 
     * @author VIVEK PS
     */
    const openDetailsScreen = (item) => {
        navigation.navigate('NewsScreen', { item: item })
    }

    /**
     * HeaderComponent(): Header componen for pinned card
     * @author VIVEK PS
     */
    const HeaderComponent = () => {
        return (
            pinnedData ?
                <TouchableOpacity style={styles.renderItem} onPress={() => openDetailsScreen(pinnedData)}>
                    <View style={styles.deleteIconRow}>
                        <PinIcon onPress={() => onUnpin()} />
                    </View>
                    <RenderItemImages data={pinnedData} />
                    <RenderItemDetails data={pinnedData} />
                </TouchableOpacity>
                : null
        )
    }

    /**
     * renderItem(): Renders cards in flatlist avoiding the pinned card
     * @param {*} item 
     * @param {*} index 
     * @returns 
     * @author VIVEK PS
     */
    const renderItem = ({ item, index }) => {
        if (pinnedData?.title == item.title && pinnedData?.author == item.author) {
            return null
        }
        else {
            return (
                <RenderItemContent item={item} key={index} />
            )
        }
    }

    /**
     * RenderLeftActions(): Renders the pin button on left swipe 
     * @param {*} item 
     * @returns 
     * @author VIVEK PS
     */
    const RenderLeftActions = (item) => {
        return (
            <TouchableOpacity style={styles.leftSwipeButton}
                onPress={() => { onPin(item) }}>
                <Icon name="pin" size={28} color="white" />
                <Animated.Text style={styles.leftSwipeText}>
                    Pin to top
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    /**
     * RenderRightActions(): Renders the pin button on right swipe 
     * @param {*} item 
     * @returns 
     * @author VIVEK PS
     */
    const RenderRightActions = (item) => {
        return (
            <TouchableOpacity style={styles.rightSwipeButton}
                onPress={() => { onDelete(item) }}>
                <Icon name="delete" size={28} color="white" />
                <Animated.Text
                    style={styles.rightSwipeText}>
                    Delete
                </Animated.Text>
            </TouchableOpacity>
        );
    };

    /**
     * RenderItemContent(): Renders the flatlist card component
     * @param {*} item 
     * @returns 
     * @author VIVEK PS
     */
    const RenderItemContent = ({ item }) => {
        return (
            <TouchableOpacity style={styles.renderItem} onPress={() => openDetailsScreen(item)}>
                <Swipeable
                    renderLeftActions={() => RenderLeftActions(item)}
                    renderRightActions={() => RenderRightActions(item)}
                >
                    <RenderItemImages data={item} />
                    <RenderItemDetails data={item} />
                </Swipeable>
            </TouchableOpacity>
        )
    }

    /**
     * RenderItemImages(): Returns image section for rendering inside flatlist
     * @param {*} param0 
     * @returns 
     * @author VIVEK PS
     */
    const RenderItemImages = ({ data }) => {
        return (
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../resources/placeholder_image.jpeg')} resizeMode="cover" style={styles.imageBackground}>
                    <Image
                        style={styles.image}
                        source={data?.urlToImage ? { uri: data?.urlToImage } : require('../resources/placeholder_image.jpeg')}
                        loadingIndicatorSource={require('../resources/placeholder_image.jpeg')}
                    />
                </ImageBackground>
            </View>
        )
    }

    /**
     * RenderItemDetails(): Returns details section for rendering inside flatlist
     * @param {*} param0 
     * @returns 
     * @author VIVEK PS
     */
    const RenderItemDetails = ({ data }) => {
        return (
            <View style={styles.detailsContainer}>
                <Text style={styles.heading}>{data.title}</Text>
                <Text style={styles.author}>- {data.author || 'Author'}</Text>
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
                ListHeaderComponent={HeaderComponent}
                extraData={newsData}
            />
        </View>
    )
}

export default NewsList

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    renderItem: {
        marginHorizontal: 20,
        marginVertical: 17,
        flex: 1,
        flexWrap: 'wrap',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        overflow: 'hidden',
    },
    heading: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    author: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
        alignSelf: 'flex-end',
    },
    imageContainer: {
        flex: 1,
        overflow: 'hidden',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    image: {
        width: width - 40,
        height: 180,
        flex: 1,
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
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
    pinIconActive: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 30,
        width: 30,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#3395ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white'
    },
    leftSwipeButton: {
        backgroundColor: '#3395ff',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftSwipeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    rightSwipeButton: {
        backgroundColor: 'red',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSwipeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
})