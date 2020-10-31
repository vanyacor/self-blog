import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert, Dimensions } from 'react-native';
import { THEME } from './../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from './../components/AppHeaderIcon';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toogleBooked } from '../store/actions/post-actions';


const screenWidth = Math.round(Dimensions.get('window').width);


export const PostScreen = ({ navigation }) => {
    const postId = navigation.getParam('postId');

    const booked = useSelector(state =>
        state.post.bookedPosts.some(post => post.id === postId)
    );
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId));

    const dispatch = useDispatch();


    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked])

    const toggleHandler = useCallback(() => {
        dispatch(toogleBooked(post));
    }, [dispatch, post]); // React will not create new Function, but will use an exist

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler]);

    const removeHandler = () => {
        Alert.alert(
            "POST deleting",
            'You are sure you want to delete?',
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: "destructive",
                    onPress: () => {
                        navigation.goBack()
                        dispatch(removePost(postId));
                    }
                }
            ]
        )
    }

    if (!post) {
        return (navigation.goBack())
    }
    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <Image source={{ uri: post.img }} style={{
                ...styles.image,
                height: (screenWidth - 30) * post.heightToWidth || 200,
            }} />
            <View style={styles.textWrapper}>
                <Text>{post.text}</Text>
            </View>
            <Button
                title="Delete"
                color={THEME.DANGER_COLOR}
                onPress={removeHandler}
            />
        </ScrollView>
    )
};

PostScreen.navigationOptions = ({ navigation }) => {
    const booked = navigation.getParam('booked');
    const toggleHandler = navigation.getParam('toggleHandler');
    const iconName = booked ? 'ios-star' : 'ios-star-outline';
    return ({
        headerTitle: 'Post ' + new Date(navigation.getParam('date')).toLocaleDateString(),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Take photo" iconName={iconName} onPress={toggleHandler} />
            </HeaderButtons>
        ),
    })
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        padding: 10
    },
    image: {
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    textWrapper: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
});