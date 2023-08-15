import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { getData } from './src/offline/OfflineStorage';
import { fetchNewsData, retrieveDataFromLocal } from './src/redux/actions/NewsReducerActions';
import Dashboard from './src/screens/Dashboard';
import NewsScreen from './src/screens/NewsScreen';

const Stack = createStackNavigator();

/**
 * App(): Root App file
 * @returns 
 * @author VIVEK PS
 */
function App(): JSX.Element {
  const dispatch = useDispatch()

  useEffect(() => {
    init()
    dispatch(fetchNewsData())
    SplashScreen.hide();
  }, [])

  /**
   * init(): Retrieves locally stored data and add to redux
 * @author VIVEK PS
   */
  const init = async () => {
    const storedData = await getData();
    console.log("============= storedData ", storedData)
    dispatch(retrieveDataFromLocal(storedData))
  }

  // Navigation component
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Latest News' }} />
          <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ title: 'Detailed News' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
