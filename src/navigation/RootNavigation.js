import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import NewsScreen from '../screens/NewsScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export const RootNavigation=()=> {
    return (
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="NewsScreen" component={NewsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}