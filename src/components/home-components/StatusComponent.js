import React from 'react';
import { View, Text } from 'react-native';

import WeeklyCard from './status-cards/WeeklyCard'

export default function StatusComponent(){
    return(
        // The two views are for the entire View itself
        <View className="w-full px-8 mt-1">
            <View className="w-full flex-row">
                {/* Left Side */}
                <WeeklyCard percentage={0}/>

                {/* Right Side */}
                <View className="w-[170px]">
                    <Text className="text-white">Test</Text>
                </View>
            </View>
        </View>
    );
}