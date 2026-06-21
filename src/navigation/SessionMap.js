import React from 'react';
import { View } from 'react-native';
import { Map, Camera } from '@maplibre/maplibre-react-native';

import SessionSetup from "../components/SessionSetup.js"

export default function SessionMap(){
    return(
        <View className="relative w-full h-full">
            <Map mapStyle="https://tiles.openfreemap.org/styles/dark">
                <Camera 
                    zoomLevel={14}
                    centerCoordinate={[121.0, 14.5]}
                    pitch={45}      // Tilt
                    heading={30}    // Rotation
                    animationDuration={2000} // Transition
                />
            </Map>
            <View className="absolute inset-0 flex items-center justify-center" pointerEvents="box-none">
                <SessionSetup />
            </View>
        </View>
    );
}
