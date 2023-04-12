import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const NavigationScreen = () => {
    const [startingPoint, setStartingPoint] = useState('');
    const [destination, setDestination] = useState('');
    const [region, setRegion] = useState(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }, []);

    const getDirections = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startingPoint}&destination=${destination}&key=YOUR_API_KEY`,
            );
            const points = decode(response.data.routes[0].overview_polyline.points);
            const coords = points.map(point => {
                return {
                    latitude: point[0],
                    longitude: point[1],
                };
            });
            setCoordinates(coords);
        } catch (error) {
            console.log(error);
        }
    };

    const decode = (t, e) => {
        for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0; u < t.length;) {
            n = 0, o = 0;
            do {
                o = t.charCodeAt(u++) - 63;
                n |= (31 & o) << h;
                h += 5;
            } while (o >= 32);
            i += n & 1 ? ~(n >> 1) : n >> 1;
            n = 0, h = 0;
            do {
                o = t.charCodeAt(u++) - 63;
                n |= (31 & o) << h;
                h += 5;
            } while (o >= 32);
            l += n & 1 ? ~(n >> 1) : n >> 1, r = [i / 1e5, l / 1e5], d.push(r);
        }
        return d = d.map(function (t) {
            return [(e = t)[0] = e[0] * 1e5, e[1] = e[1] * 1e5, e];
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Starting Point"
                    onChangeText={setStartingPoint}
                    value={startingPoint}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destination"
                    onChangeText={setDestination}
                    value={destination}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.directionsButton} onPress={getDirections}>
                    <Text style={styles.directionsButtonText}>Get Directions</Text>
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                <Polyline
                    coordinates={coordinates}
                    strokeWidth={5}
                    strokeColor="#1a73e8"
                />
                {region && (
                    <Marker
                        coordinate={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                        }}
                        pinColor="green"
                        title="Current Location"
                    />
                )}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    directionsButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    directionsButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    map: {
        flex: 1,
    },
});

export default NavigationScreen;