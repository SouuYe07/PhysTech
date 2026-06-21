import React from 'react';
import { View, Text } from 'react-native';

import WeeklyCard from './status-cards/WeeklyCard';
import FriendsCard from './status-cards/FriendsCard';
import StepsCard from './status-cards/StepsCard';

export default function StatusComponent() {
    return (
        <View className="w-full px-8 mt-1 pb-24">
            <View className="w-full flex-row gap-3 h-[260px]">
                {/* Left Side */}
                <View className="w-[170px]">
                    <WeeklyCard percentage={54} />
                </View>

                {/* Right Side */}
                <View className="flex-1 flex-col gap-3">
                    <FriendsCard friends={53} peopleYouMayKnow={10} />
                    <StepsCard steps={14211} />
                </View>
            </View>
        </View>
    );
}