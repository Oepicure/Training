import * as React from 'react';
import Tabnavigator from './TabNavigator.js'
import AuthNavigator from './AuthNavigator.js'
import { createStackNavigator } from '@react-navigation/stack';

  
const Stack = createStackNavigator()

function StackNavigator() {
    return (
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name='Home' component={Tabnavigator} options={{ title:''}}/>
                <Stack.Screen name='Auth' component={AuthNavigator} options={{ title:''}}/>
            </Stack.Navigator>
    )
}

export default StackNavigator
  
