import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera, Marker, GeoJSONSource, Layer } from '@maplibre/maplibre-react-native';
import { useFocusEffect } from '@react-navigation/native';

import * as expoLocation from 'expo-location';

import Location from '../../assets/map-icons/Location.svg';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js";
import SessionControls from '../components/SessionControls.js';
import SessionProgress from '../components/SessionProgress';

import { supabase } from '../lib/supabase';

// One global room for the demo — everyone who starts a session joins this channel.
const SESSION_ID = 'test-session-1';

const toLineString = (coords) => ({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coords.map(p => [p.longitude, p.latitude]),
        },
    });

const haversineKm = (a, b) => {
    const R = 6371;
    const dLat = (b.latitude - a.latitude) * Math.PI / 180;
    const dLng = (b.longitude - a.longitude) * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 +
        Math.cos(a.latitude * Math.PI / 180) *
        Math.cos(b.latitude * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

export default function SessionMap({ navigation }){
    const [sessionStarted, setSessionStarted] = useState(true);
    const [config, setConfig] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [paceMinPerKm, setPaceMinPerKm] = useState(0);
    const [routeCoords, setRouteCoords] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [runningMates, setRunningMates] = useState({});
    const channelRef = useRef(null);
    // Identity for this runner — no accounts, so the name they typed IS who they are.
    // myId = name + random suffix (unique, dup-name-proof); myName = what others see.
    const myIdRef = useRef(null);
    const myNameRef = useRef(null);

    const onPaused = () => setIsPaused(current => !current);

    const onStop = async () => {
        const { error } = await supabase.from('sessions').insert({
            distance_km: distanceKm,
            pace_min_per_km: paceMinPerKm,
            duration_seconds: elapsedSeconds,
        });
        if (error) console.log('Save error:', error);
        else console.log('Session saved!');
        
        setSessionStarted(true);
        setIsPaused(false);
        setElapsedSeconds(0);
        setDistanceKm(0);
        setPaceMinPerKm(0);
        setRouteCoords([]);
        setRunningMates({});

    }

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
        if (sessionStarted) return;

        const channel = supabase.channel(`session:${SESSION_ID}`);
        channelRef.current = channel;

        // Receive other users' locations
        channel.on('broadcast', { event: 'location' }, ({ payload }) => {
            if (payload.userId === myIdRef.current) return;
            console.log('Received from:', payload.name, payload.latitude, payload.longitude);
            setRunningMates(prev => {
                const existing = prev[payload.userId];
                const prevCoords = existing ? existing.coords : [];
                return {
                    ...prev,
                    [payload.userId]: {
                        name: payload.name,
                        coords: [...prevCoords, { latitude: payload.latitude, longitude: payload.longitude }],
                    }
                };
            });
        }).subscribe((status) => {
            console.log('Broadcast status:', status);
        });

        return () => {
            supabase.removeChannel(channel);
            channelRef.current = null;
        };
    }, [sessionStarted]);

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

                    if (channelRef.current) {
                        channelRef.current.send({
                            type: 'broadcast',
                            event: 'location',
                            payload: { userId: myIdRef.current, name: myNameRef.current, latitude, longitude }
                        });
                        console.log('Broadcasted:', latitude, longitude);
                    }

                    setRouteCoords(prev => {
                        const updated = [...prev, point];

                        // Total distance
                        let total = 0;
                        for (let i = 1; i < updated.length; i++) {
                            total += haversineKm(updated[i - 1], updated[i]);
                        }
                        setDistanceKm(total);

                        // Pace (min/km)
                        setElapsedSeconds(s => {
                            if (total > 0) setPaceMinPerKm((s / 60) / total);
                            return s;
                        });

                        return updated;
                    });
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

                         {Object.entries(runningMates).map(([userId, mate]) => {
                            const last = mate.coords[mate.coords.length - 1];
                            if (!last) return null;
                            return (
                                <React.Fragment key={userId}>
                                    {mate.coords.length >= 2 && (
                                        <GeoJSONSource id={`route-${userId}`} data={toLineString(mate.coords)}>
                                            <Layer
                                                id={`routeLine-${userId}`}
                                                type="line"
                                                paint={{ lineColor: '#FFC710', lineWidth: 5 }}
                                                layout={{ lineCap: 'round', lineJoin: 'round' }}
                                            />
                                        </GeoJSONSource>
                                    )}
                                    <Marker
                                        id={userId}
                                        lngLat={[last.longitude, last.latitude]}
                                        anchor={{ x: 0.5, y: 0.5 }}
                                        offset={[0, -8]}
                                    >
                                        <View className="items-center">
                                            <Text className="text-white text-[10px] font-heading mb-1">{mate.name}</Text>
                                            <Location />
                                        </View>
                                    </Marker>
                                </React.Fragment>
                            );
                        })}

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
                            myNameRef.current = cfg.sessionName.trim();
                            myIdRef.current = `${cfg.sessionName.trim()}-${Math.random().toString(36).slice(2, 7)}`;
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
