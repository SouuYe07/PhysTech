import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Map } from '@maplibre/maplibre-react-native';

// import * as Location from 'expo-location'

export default function App() {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   async function getCurrentLocation() {
      
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }

  //   getCurrentLocation();
  // }, []);

  // let text = 'Waiting...';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <Map mapStyle="https://demotiles.maplibre.org/style.json" />
  );
}