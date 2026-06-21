import React from 'react';
import { View, Text } from 'react-native';

export default function FriendsCard({ friends, peopleYouMayKnow }) {
    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl justify-center px-4 py-3">
            <Text className="text-[#FFC107] text-[22px] font-body-bold tracking-[-1px]">
                {friends}
            </Text>
            <Text className="text-[#AFAFAF] text-[12px] font-body mb-2" numberOfLines={1}>
                Friends
            </Text>

            <Text className="text-[#FFC107] text-[22px] font-body-bold tracking-[-1px]">
                {peopleYouMayKnow}
            </Text>
            <Text className="text-[#AFAFAF] text-[12px] font-body">
                People you {"\n"}may know
            </Text>
        </View>
    );
}