import React from 'react';
import { Map, Camera } from '@maplibre/maplibre-react-native';
import { Text } from 'react-native';

export default function SessionSetup() {
    return (
        <Map mapStyle="https://tiles.openfreemap.org/styles/dark">
            <Camera 
                zoomLevel={14}
                centerCoordinate={[121.0, 14.5]}
                pitch={45}      // Tilt
                heading={30}    // Rotation
                animationDuration={2000} // Transition
            />
        </Map>
    )
}
