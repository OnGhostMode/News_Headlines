import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * storeData(): Stores data to local storage
 * @param {*} value 
 * @author VIVEK PS
 */
const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('store', jsonValue);
    } catch (e) {
        // saving error
    }
};

/**
 * getData(): Retrieves stored data from local storage
 * @returns 
 * @author VIVEK PS
 */
const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};