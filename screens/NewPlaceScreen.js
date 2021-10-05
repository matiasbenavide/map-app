import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { addPlace } from '../store/places.actions';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';

const NewPlaceScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();

    const handleTitleChange = text => setTitle(text)
    
    const handleSave = () => {
        dispatch(addPlace(title, image, location))
        navigation.navigate('Direcciones')
    }

    const handlePickImage = (uri) => {
        setImage(uri);
    }

    const handlePickLocation = (loc) => {
        setLocation(loc);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Nueva Direccion</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={handleTitleChange}
                />

                <ImageSelector onImage={handlePickImage} />

                <LocationSelector onLocation={handlePickLocation} />
                
                <Button
                    title="Grabar Dirección"
                    color={COLORS.MAROON}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    }
})

export default NewPlaceScreen;
