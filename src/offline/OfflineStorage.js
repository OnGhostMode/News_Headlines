import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * storeData(): Stores data to local storage
 * @param {*} value 
 * @author VIVEK PS
 */
export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('newsData', jsonValue);
    } catch (error) {
        console.log("------------ storeData error ", error)
    }
};

/**
 * getData(): Retrieves stored data from local storage
 * @returns 
 * @author VIVEK PS
 */
export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('newsData');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log("------------ getData error ", error)
    }
};