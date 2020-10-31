import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, Button, Alert, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

async function askForPermissions() {
    const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )
    if (status !== 'granted') {
        Alert.alert('Error', 'You did not give permissions to use camera')
        return false;
    }
    return true;
}

export const PhotoPicker = ({ onPick, image, setImage }) => {
    const [imageHeightToWidth, setHeightToWidth] = useState(null);

    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [4, 3]
        })

        setImage(img.uri);
        setHeightToWidth(img.height / img.width);
        onPick(img.uri, img.height / img.width);
    }

    return (
        <View style={styles.wrapper}>
            {image ? null : <Button title="Create photo" onPress={takePhoto} />}
            {image && <Image style={{ ...styles.image, height: (screenWidth - 20) * imageHeightToWidth || 0 }} source={{ uri: image }} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    }
})