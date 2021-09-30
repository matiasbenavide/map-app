import React, { useState } from 'react';
import {
    View,
    Button,
    Image,
    Text,
    StyleSheet,
    Alert
}from 'react-native';
import * as Location from 'expo-location';

import { COLORS } from '../constants';

const LocationSelector = props => {
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPremissions = async () => {
        const { status } = await Location
    }

    const handle
}