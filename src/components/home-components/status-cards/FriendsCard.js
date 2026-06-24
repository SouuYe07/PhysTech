import React from 'react';
import { View, Text } from 'react-native';

export default function FriendsCard({ friends, peopleYouMayKnow }) {
    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl items-center justify-center px-5 py-3">
            
            {/* Friends Section */}
            <View className="items-center justify-center relative mb-1">
                <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px] leading-7">
                    {friends}
                </Text>
            </View>
            <Text className="text-white text-[16px] font-body-semibold mb-4" numberOfLines={1}>
                Friends
            </Text>

            {/* People You May Know Section */}
            <View className="items-center justify-center relative mb-1">
                <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px] leading-7">
                    {peopleYouMayKnow}
                </Text>
            </View>
            <Text className="text-white text-[16px] font-body-semibold leading-5 text-center">
                People you {"\n"}may know
            </Text>
            
        </View>
    );
}