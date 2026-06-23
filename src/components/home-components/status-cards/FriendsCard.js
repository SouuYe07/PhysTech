import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FriendsCard({ friends, peopleYouMayKnow }) {
    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl items-center justify-center px-5 py-3 ">
            <View className="items-center justify-center relative mb-1">
                {/* BACK LAYER: Pure Tailwind View Box that creates the wide white blur */}
                <View className="absolute w-8 h-8 bg-white/20 rounded-full blur-xl scale-[2]" />
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)', 'transparent']}
                    className="absolute inset-0 rounded-full scale-125"
                />

                {/* FRONT LAYER: Crisp plain text over the blur */}
                <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px] leading-7">
                    {friends}
                </Text>
            </View>
            <Text className="text-white text-[16px] font-body-semibold mb-3" numberOfLines={1}>
                Friends
            </Text>

            <View className="items-center justify-center relative mb-1">
                {/* BACK LAYER: Wide white ambient glow box */}
                <View className="absolute w-8 h-8 bg-white/20 rounded-full blur-xl scale-[2]" />
                
                {/* FRONT LAYER */}
                <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px] leading-7">
                    {peopleYouMayKnow}
                </Text>
            </View>
            <Text className="text-white text-[16px] font-body-semibold leading-4 text-center">
                People you {"\n"}may know
            </Text>
        </View>
    );
}
