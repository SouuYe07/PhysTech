import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import Header from '../components/Header.js'
import LiveNowCard from '../components/home-components/LiveNowCard.js';
import PlanFriendsCard from '../components/home-components/PlanFriendsCard.js';
import StatusComponent from '../components/home-components/StatusComponent.js';

export default function Home() {
    return (
        <View className="bg-black flex-1">
            <View className="w-full">
                <Header name="Frenemy"/>
            
                <View className="items-center w-full mt-2">
                    <LiveNowCard friends="3" area="39"/>
                    <PlanFriendsCard activity="Running" name="Oble" date="July 1" time="4:00 PM"/>
                </View>

                <Text className="text-white text-[28px] font-heading pl-8 mt-3 mb-1 tracking-[-1px]"> 
                    Status 
                </Text>
                <View className="items-center w-full">
                    <StatusComponent />
                </View>
            </View>
        </View>
    );
}
