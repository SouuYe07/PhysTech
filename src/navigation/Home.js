import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import Header from '../components/Header.js'
import LiveNowCard from '../components/LiveNowCard.js';

export default function Home() {
    return (
        <View className="bg-black flex-1">
            <Header name="Frenemy"/>
            <View className="items-center w-full">
                <LiveNowCard friends="3" area="39"/>
            </View>
        </View>
    );
}
