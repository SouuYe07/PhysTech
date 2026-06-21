import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function StepsCard({ steps }) {
    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl justify-center px-4 py-3">
            <View className="flex-row items-center justify-between">
                <Text 
                    className="text-[#FFC107] text-[26px] font-body-bold tracking-[-1px]"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {steps.toLocaleString()}
                </Text>
                <Feather name="map-pin" size={16} color="#FFC107" />
            </View>
            <Text className="text-[#AFAFAF] text-[12px] font-body mt-1">
                the past week
            </Text>
        </View>
    );
}