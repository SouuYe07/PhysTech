import { React } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/Tabs.js';

export default function App(){
    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}