import * as React from 'react';
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'
import { createStackNavigator } from '@react-navigation/stack';

  
const Stack = createStackNavigator()

function StackNavigator() {
    return (
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signup' component={Signup}/>
            </Stack.Navigator>
    )
}

export default StackNavigator