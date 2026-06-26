import React, { useState, useEffect } from 'react';
import { Button, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera } from '@maplibre/maplibre-react-native';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js";
import SessionControls from '../components/SessionControls.js';
import SessionProgress from '../components/SessionProgress';
import { supabase } from '../lib/supabase';
import { useSessionTracking } from '../hooks/useSessionTracking';


export default function SessionMap({ navigation }){
    const [sessionStarted, setSessionStarted] = useState(false);
    const [config, setConfig] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [paceMinPerKm, setPaceMinPerKm] = useState(0);

    const { saveSession } = useSessionTracking({
        isActive: !sessionStarted,
        isPaused,
        isLeader: true,
        onLocationUpdate: ({ distance_km, pace }) => {
            setDistanceKm(distance_km);
            setPaceMinPerKm(pace);
        },
    });

    const onPaused = () => setIsPaused(current => !current);

    const onStop = () => {
        saveSession(elapsedSeconds);
        setSessionStarted(true);
        setIsPaused(false);
        setElapsedSeconds(0);
        setDistanceKm(0);
        setPaceMinPerKm(0);
    };
    
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

    useEffect(() => {
    if (sessionStarted) return; 

    const channel = supabase
        .channel('session-realtime')
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'sessions',       
        }, (payload) => {
            console.log('Realtime payload:', payload);
            const { distance_km, pace_min_per_km } = payload.new;
            if (distance_km !== undefined) setDistanceKm(distance_km);
            if (pace_min_per_km !== undefined) setPaceMinPerKm(pace_min_per_km);
        })
        .subscribe((status) => {
            console.log('Supabase status:', status);
        });


    return () => supabase.removeChannel(channel);
    }, [sessionStarted]);

    return(
        <View className="relative w-full h-full">
            
             <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, zIndex: 99, alignItems: 'center', gap: 10 }}>
                <Button
                    title="Test Insert"
                    onPress={async () => {
                        const { data, error } = await supabase
                            .from('sessions')
                            .insert({ distance_km: 5.5, pace_min_per_km: 4.2 });
                        console.log('Insert result:', data, error);
                    }}
                />
                <Button
                    title="Test Update"
                    onPress={async () => {
                        const { data, error } = await supabase
                            .from('sessions')
                            .update({ distance_km: Math.random() * 10 })
                            .eq('id', 1);
                        console.log('Update result:', data, error);
                    }}
                />
            </View>
            
            <Map 
                mapStyle="https://tiles.openfreemap.org/styles/dark"
                logo={false}
                attribution={false}
            >
                <Camera 
                    zoomLevel={14}
                    centerCoordinate={[121.0, 14.5]}
                    pitch={45}      // Tilt
                    heading={30}    // Rotation
                    animationDuration={2000} // Transition
                />
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
