import React from 'react';
import { View, Text } from 'react-native';

import WeeklyCard from './status-cards/WeeklyCard';
import FriendsCard from './status-cards/FriendsCard';
import StepsCard from './status-cards/StepsCard';

export default function StatusComponent() {
    return (
        <View className="w-full px-8 mt-1 pb-24">
            <View className="w-full flex-row gap-3">
                {/* Left Side */}
                <View className="h-[270px] flex-[1.4]">
                    <WeeklyCard percentage={54} />
                </View>

                {/* Right Side */}
                <View className="gap-3 flex-1">
                    <View className="h-[166px]">
                        <FriendsCard friends={53} peopleYouMayKnow={10} />
                    </View>
                    <View className="h-[96px]">
                        <StepsCard steps={14211} />
                    </View>
                </View>
            </View>
        </View>
    );
}