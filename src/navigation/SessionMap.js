import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera, Marker, GeoJSONSource, Layer } from '@maplibre/maplibre-react-native';
import { useFocusEffect } from '@react-navigation/native';

import * as expoLocation from 'expo-location';

import Location from '../../assets/map-icons/Location.svg';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js";
import SessionControls from '../components/SessionControls.js';
import SessionProgress from '../components/SessionProgress';

const toLineString = (coords) => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coords.map(p => [p.longitude, p.latitude]),
        },
    })

export default function SessionMap({ navigation }){
    const [sessionStarted, setSessionStarted] = useState(true);
    const [config, setConfig] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    
    const onPaused = () => setIsPaused(current => !current);
    const onStop = () => {
        setSessionStarted(true);
        setIsPaused(false);
        setElapsedSeconds(0);
        setDistanceKm(0);
        setPaceMinPerKm(0);
        setRouteCoords([]);
    }

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [paceMinPerKm, setPaceMinPerKm] = useState(0);
    const [routeCoords, setRouteCoords] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    // Intitializes the current location once SessionMap. js is opened
    const getCurrentLocation = async () => {
        const { status } = await expoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            navigation.navigate('Home');
            return;
        }

        const location = await expoLocation.getCurrentPositionAsync({
            accuracy: expoLocation.Accuracy.Balanced
        });
        const { latitude, longitude } = location.coords;
        console.log(`${latitude}, ${longitude}`)

        setCurrentLocation({ latitude, longitude });
    };

    // Calls getCurrentLocation once this page is loaded, instead of waiting for an element to be mounted
    useFocusEffect(
        useCallback(() => {
            getCurrentLocation();
        }, [])
    );

    // Removes tab navigation when user starts a session
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: sessionStarted ? tabBarStyle : {display: 'none'},
        });
    }, [sessionStarted, navigation]

    );

    // Timer
    useEffect(() => {
        if (sessionStarted || isPaused) return;
        const timer = setInterval(() => {
            setElapsedSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [sessionStarted, isPaused]);

    // Adding lines to your current user
    useEffect(() => {
        if (sessionStarted || isPaused) return;

        let subscription;
        (async () => {
            subscription = await expoLocation.watchPositionAsync(
                { accuracy: expoLocation.Accuracy.BestForNavigation, distanceInterval: 1 },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    const point = { latitude, longitude };

                    setCurrentLocation(point);
                    setRouteCoords(prev => [...prev, point]);
                }
            );
        })();

        return () => subscription?.remove();
    }, [sessionStarted, isPaused]);

    const markerPoint = routeCoords.length > 0 ? routeCoords[routeCoords.length - 1] : currentLocation;

    return(
        <View className="relative w-full h-full">
            <Map 
                mapStyle="https://tiles.openfreemap.org/styles/dark"
                logo={false}
                attribution={false}
            >
                {currentLocation && (
                    <>
                        <Marker
                            id="me"
                            lngLat={[ markerPoint.longitude, markerPoint.latitude ]}
                            anchor={{ x: 0.5, y: 0.5 }}
                            offset={[0, -8]}
                        >   
                            <Location />
                        </Marker>
                        {routeCoords.length >= 2 && (
                            <GeoJSONSource id="route" data={toLineString(routeCoords)}>
                                <Layer
                                    id="routeLine"
                                    type="line"
                                    paint={{ lineColor: '#FFC710', lineWidth: 5 }}
                                    layout={{ lineCap: 'round', lineJoin: 'round' }}
                                />
                            </GeoJSONSource>
                        )}
                        <Camera 
                            zoom={16}
                            center={[currentLocation.longitude, currentLocation.latitude ]}
                            pitch={45}      // Tilt
                            bearing={30}    // Rotation
                            duration={2000} // Transition
                        />
                    </>
                )}
            </Map>

            {!sessionStarted && (
                <SessionProgress
                    duration={elapsedSeconds}
                    distance={distanceKm}
                    pace={paceMinPerKm}
                    isPaused={isPaused}
                />
            )}

            {sessionStarted && (
                <View
                    className="absolute inset-0 items-center justify-center bg-black/40"
                    pointerEvents="box-none"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className="absolute inset-0" />
                    </TouchableWithoutFeedback>

                    <SessionSetup
                        onStart={(cfg) => {
                            setConfig(cfg);
                            setSessionStarted(false);
                        }}
                    />
                </View>
            )}

            {!sessionStarted &&(
                <SessionControls
                    isPaused={isPaused}
                    onPaused={onPaused}
                    onStop={onStop}
                />
            )}
        </View>
    );
}
