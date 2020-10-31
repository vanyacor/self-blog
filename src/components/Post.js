import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const Post = ({ post, onOpen }) => {
    return (
        <View style={styles.post}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onOpen(post)}>
                <Image style={{
                    ...styles.image,
                    height: (screenWidth - 30) * post.heightToWidth || 200
                }} source={{ uri: post.img }} />
            </TouchableOpacity>
            <View style={styles.date}>
                <Text>{new Date(post.date).toLocaleDateString()}</Text>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: "hidden",
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    date: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    }
})
