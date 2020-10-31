import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from './../components/AppHeaderIcon';
import { THEME } from './../theme';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/actions/post-actions';
import { PhotoPicker } from './../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const heigthToWidth = useRef();

    const dispatch = useDispatch();


    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img: image,
            booked: false,
            heightToWidth: heigthToWidth.current,
        }
        dispatch(addPost(post));
        setText('');
        setImage(null);
        navigation.navigate('Main');
    }

    const photoPickHandler = (uri, heightToWidth) => {
        setImage(uri);
        heigthToWidth.current = heightToWidth;
    }

    return (
        <ScrollView >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create new POST</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Enter note's text"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker onPick={photoPickHandler} image={image} setImage={setImage} />
                    <Button
                        title="Create post"
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text || !image}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
};

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Create post',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textArea: {
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: THEME.MAIN_COLOR,
        borderStyle: 'solid',
    }
});