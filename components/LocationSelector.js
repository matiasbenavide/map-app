import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert }from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import MapPreview from './MapPreview';

import { COLORS } from '../constants';

const LocationSelector = props => {
    const navigation = useNavigation();
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPremissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesita dar permisos a la ubicación para acceder a la aplicación',
                [{ text: 'Ok' }],
            )

            return false;
        }

        return true;
    }

    const handleLocation = async () => {
        const isLocationOk = await verifyPremissions();
        if(!isLocationOk) return;

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        });

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        props.onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    return(
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
                    <Text>No hay coordenadas</Text>
            </MapPreview>
            <Button
                title="Buscar Ubicación"
                color={COLORS.PEACH_PUFF}
                onPress={handleLocation}
            />
            <Button
                title="Elegir Del Mapa"
                color={COLORS.BLUSH}
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
    location: {
        width: '100%',
        height: '100%',
    },
});

export default LocationSelector;