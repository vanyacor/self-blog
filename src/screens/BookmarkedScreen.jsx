import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from './../components/AppHeaderIcon';
import { PostList } from './../components/PostLIst';
import { useSelector } from 'react-redux';

export let BookmarkedScreen = ({ navigation }) => {
    const bookedPosts = useSelector(state => state.post.bookedPosts);

    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }

    return (
        <PostList data={bookedPosts} onOpen={openPostHandler} />
    )
};

BookmarkedScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Booked',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
});
