import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MainScreen } from './../screens/MainScreen';
import { PostScreen } from './../screens/PostScreen';
import { AboutScreen } from './../screens/AboutScreen';
import { THEME } from './../theme';
import { BookmarkedScreen } from './../screens/BookmarkedScreen';
import { CreateScreen } from './../screens/CreateScreen';

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.os === 'android' ? '#fff' : '#fff'
        },
        headerTintColor: Platform.os === 'android' ? THEME.MAIN_COLOR : THEME.MAIN_COLOR
    }
};

const PostNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Post: PostScreen
    },
    navigatorOptions);

const BookedNavigator = createStackNavigator(
    {
        Booked: BookmarkedScreen,
        Post: PostScreen
    },
    navigatorOptions);

const BottomNavigator = createBottomTabNavigator({
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: () => null,
            tabBarIcon: info => (<Ionicons name='ios-albums' size={25} color={info.tintColor} />)
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: () => null,
            tabBarIcon: info => (<Ionicons name='ios-star' size={25} color={info.tintColor} />)
        }
    }
},
    {
        tabBarOptions: {
            showLable: false,
            activeTintColor: THEME.MAIN_COLOR
        }
    })

const AboutNavigator = createStackNavigator({
    About: AboutScreen
},
    navigatorOptions)

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
},
    navigatorOptions)

const MainNavigator = createDrawerNavigator({
    Posts: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Main',
            drawerIcon: (<AntDesign name="home" size={24} color="black" />)
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'New post',
            drawerIcon: (<Ionicons name="md-create" size={24} color="black" />)
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'About App',

            
            drawerIcon: (<Ionicons name="ios-information-circle-outline" size={24} color="black" />)
        }
    },
},
    {
        contentOptions: {
            labelStyle: {
                fontFamily: 'open-bold',
            },
            activeTintColor: THEME.MAIN_COLOR,
        }
    });

export const AppNavigation = createAppContainer(MainNavigator);