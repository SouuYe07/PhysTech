import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera } from '@maplibre/maplibre-react-native';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js";
import SessionControls from '../components/SessionControls.js';

export default function SessionMap({ navigation }){
    const [sessionStarted, setSessionStarted] = useState(false);
    const [config, setConfig] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    
    const onPause = () => setIsPaused(true);
    const onResume = () => setIsPaused(false);
    const onStop = () => {
        setSessionStarted(true);
        setIsPaused(false);
    }
    
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: sessionStarted ? tabBarStyle : {display: 'none'},
        });
    }, [sessionStarted, navigation]

    );

    return(
        <View className="relative w-full h-full">
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
                    onPause={onPause}
                    onResume={onResume}
                    onStop={onStop}
                />
            )}
        </View>
    );
}
