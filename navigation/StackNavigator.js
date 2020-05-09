import * as React from 'react';
import Login from '../screens/Login.js'
import Home from '../screens/Home.js'
import Search from '../screens/Search.js'
import Post from '../screens/Post.js'
import Activity from '../screens/Activity.js'
import Profile from '../screens/Profile.js'
import Camera from '../screens/Camera.js'
import Map from '../screens/Map.js'
import Edit from '../screens/Signup'
import Comment from '../screens/Comment'
import Chat from '../screens/Chat'
import Messages from '../screens/Messages'
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles.js'
import { Ionicons } from '@expo/vector-icons';

export const Stack = createStackNavigator()

export function HomeNavigator() {
    return (
            <Stack.Navigator>
                <Stack.Screen 
                    name='Home' 
                    component={Home}
                    options= {({ navigation }) => ({
                        headerTitle: <Image style={{width: 35, height: 35}} source={require('../assets/logo.png')}/>,
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                                <Ionicons style={{margin: 10}} name='ios-camera' size={30}/>
                            </TouchableOpacity>),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                                <Ionicons style={{margin: 10}} name='ios-send' size={30}/>
                            </TouchableOpacity>)
                    })}
                />
                <Stack.Screen 
                    name='Comment' 
                    component={Comment}
                    options= {({ navigation }) => ({
                        headerTitle: 'Comment',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>),
                    })}
                />
                <Stack.Screen 
                    name='Camera' 
                    component={Camera}
                    options= {{ 
                        header: () => (null),
                    }}
                />
                <Stack.Screen 
                    name='Map'
                    component={Map}
                    options= {({ navigation }) => ({
                        headerTitle: 'Map View',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>),
                    })}
                />
                <Stack.Screen 
                    name='Messages' 
                    component={Messages}
                    options= {({ navigation }) => ({
                        headerTitle: 'Messages',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>),
                    })}
                />
                <Stack.Screen 
                    name='Chat'
                    component={Chat}
                    options= {({ navigation }) => ({
                        headerTitle: 'Chat',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>),
                    })}
                />
            </Stack.Navigator>
    )
}

export function SearchNavigator() {
    return (
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen 
                    name='Search' 
                    component={Search}
                    options= {{ 
                        header: () => (null),
                    }}
                />
                <Stack.Screen 
                    name='Profile' 
                    component={Profile}
                    options= {({ navigation }) => ({
                        headerTitle: 'Profile',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>)
                    })}
                />

            </Stack.Navigator>
    )
}

export function PostNavigator() {
    return (
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name='Post' component={Post}/>
            </Stack.Navigator>
    )
}

export function ActivityNavigator() {
    return (
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name='Activity' component={Activity}/>
            </Stack.Navigator>
    )
}

export function ProfileNavigator() {
    return (
            <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen 
                    name='My Profile' 
                    component={Profile}
                />
                <Stack.Screen 
                    name='Edit' 
                    component={Edit}
                    options= {({ navigation }) => ({
                        headerTitle: 'Edit Profile',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons style={styles.icon} name='ios-arrow-back' size={30}/>
                            </TouchableOpacity>)
                    })}
                />
            </Stack.Navigator>
    )
}




