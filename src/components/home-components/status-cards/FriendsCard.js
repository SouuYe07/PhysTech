import React from 'react';
import { View, Text } from 'react-native';

export default function FriendsCard({ friends, peopleYouMayKnow }) {
    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl items-center justify-center px-5 py-3">
            <Text className="text-[#FFC107] text-[26px] font-body-bold tracking-[-1px] leading-7">
                {friends}
            </Text>
            <Text className="text-white text-[14px] font-body-semibold mb-2" numberOfLines={1}>
                Friends
            </Text>

            <Text className="text-[#FFC107] text-[26px] font-body-bold tracking-[-1px] leading-7">
                {peopleYouMayKnow}
            </Text>
            <Text className="text-white text-[14px] font-body-semibold leading-4">
                People you {"\n"}may know
            </Text>
        </View>
    );
}