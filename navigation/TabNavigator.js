import * as React from 'react';
import Home from '../screens/Home.js'
import Search from '../screens/Search.js'
import Post from '../screens/Post.js'
import Activity from '../screens/Activity.js'
import Profile from '../screens/Profile.js'
import { HomeNavigator, SearchNavigator, PostNavigator, ActivityNavigator, ProfileNavigator } from './StackNavigator.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

  
const Tab = createBottomTabNavigator();
  
export default function TabNavigator() {
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={HomeNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'ios-home': 'md-home'} color={'black'} size={32} />
                ),
              }}
              
            />
            
          <Tab.Screen 
            name="Search" 
            component={SearchNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'ios-search': 'md-search'} color={'blue'} size={32} />
                ),
              }}
            />
          <Tab.Screen 
            name="Post" 
            component={PostNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'ios-add': 'ios-add-circle-outline'} color={'blue'} size={32} />
                ),
              }}
             />
          <Tab.Screen 
            name="Activity" 
            component={ActivityNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'ios-heart': 'ios-heart-empty'} color={'blue'} size={32} />
                ),
              }}
             />
          <Tab.Screen 
            name="My Profile" 
            component={ProfileNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons name={focused ? 'ios-person': 'md-person'}color={'blue'} size={32} />
                ),
              }}
             />
        </Tab.Navigator> 
    );
  }