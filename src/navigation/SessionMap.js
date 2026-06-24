import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Map, Camera } from '@maplibre/maplibre-react-native';

import { tabBarStyle } from '../components/TabBarStyle.js';
import SessionSetup from "../components/setup-components/SessionSetup.js"

export default function SessionMap({ navigation }){
    const [sessionStarted, setSessionStarted] = useState(true);
    const [config, setConfig] = useState(null);
    
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
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="absolute inset-0 flex items-center justify-center bg-black/40" // added bg-black/40 for a nice backdrop dim
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
                </KeyboardAvoidingView>
            )}
        </View>
    );
}
