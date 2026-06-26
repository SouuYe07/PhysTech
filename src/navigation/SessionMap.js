import React, { useState, useEffect, useCallback } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera, Marker } from '@maplibre/maplibre-react-native';
import { useFocusEffect } from '@react-navigation/native';

import * as expoLocation from 'expo-location';

import Location from '../../assets/map-icons/Location.svg';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js";
import SessionControls from '../components/SessionControls.js';
import SessionProgress from '../components/SessionProgress';


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
    }

    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [paceMinPerKm, setPaceMinPerKm] = useState(0);

    const [currentLocation, setCurrentLocation] = useState(null);

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

    useFocusEffect(
        useCallback(() => {
            getCurrentLocation();
        }, [])
    );

    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: sessionStarted ? tabBarStyle : {display: 'none'},
        });
    }, [sessionStarted, navigation]

    );

    useEffect(() => {
        if (sessionStarted || isPaused) return;
        const timer = setInterval(() => {
            setElapsedSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [sessionStarted, isPaused]);

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
                            lngLat={[ currentLocation.longitude, currentLocation.latitude ]}
                            anchor={{ x: 0.5, y:1 }}
                        >   
                            <Location />
                        </Marker>
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
