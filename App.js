import { React } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { cssInterop } from 'nativewind';

import Tabs from './src/components/Tabs.js';

// Map className to tabBarStyle
cssInterop(Tabs, {
  className: {
    target: 'screenOptions.tabBarStyle',
  },
});

export default function App(){
    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}
