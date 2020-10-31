import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from './../components/AppHeaderIcon';
import { PostList } from '../components/PostLIst';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from './../store/actions/post-actions';
import { THEME } from './../theme';

export let MainScreen = ({ navigation }) => {
    const allPosts = useSelector(state => state.post.allPosts);
    const loading = useSelector(state => state.post.loading);
    const dispatch = useDispatch();

    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    if (loading) {
        return <View style={styles.center}>
            <ActivityIndicator color={THEME.MAIN_COLOR} size={40}/>
        </View>
    }

    return (
        <PostList data={allPosts} onOpen={openPostHandler} />
    )
};

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'My blog',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Take photo" iconName="ios-camera" onPress={() => navigation.navigate('Create')} />
        </HeaderButtons>
    ),
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})