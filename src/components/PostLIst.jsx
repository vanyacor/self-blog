import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Post } from './Post';

export const PostList = ({ data = [], onOpen }) => {

    if (!data.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.noItems} >No Items</Text>
        </View>
    }


    return (
        <View style={styles.wrapper} >
            <FlatList
                contentContainerStyle={styles.flatPadding}
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => {
                    return <Post post={item} onOpen={onOpen} />
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        /* paddingHorizontal: 10 */
    },
    flatPadding: {
        paddingTop: 15,
        paddingHorizontal: 10
    },
    noItems: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
});