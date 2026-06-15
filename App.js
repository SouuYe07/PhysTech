import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Tabs from './src/components/Tabs.js';

SplashScreen.preventAutoHideAsync();

export default function App(){
    const [loaded, error] = useFonts({
      'Konkhmer-Regular': require('./assets/fonts/KonkhmerSleokchher-Regular.ttf'),
      'Lexend-Bold': require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
    });

    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);

    if (!loaded && !error) {
      return null;
    }

    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}