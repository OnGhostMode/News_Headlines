import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native/types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import retrieveStore from './src/redux/store/Store';
import Dashboard from './src/screens/Dashboard';
import NewsScreen from './src/screens/NewsScreen';

const Stack = createStackNavigator();
const { store, persistor } = retrieveStore();

/**
 * App(): Root App file
 * @returns 
 * @author VIVEK PS
 */
function App(): JSX.Element {

  useEffect(() => {
      SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerBackTitleVisible: false }}>
              <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Latest News' }} />
              <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ title: 'Detailed News' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
