import React from 'react';
import { View, Text } from 'react-native';

import WeeklyCard from './status-cards/WeeklyCard'
import FriendsCard from './status-cards/FriendsCard'
import StepsCard from './status-cards/StepsCard'

export default function StatusComponent(){
    return(
        // The two views are for the entire View itself
        <View className="w-full px-8 mt-1">
            <View className="w-full flex-row gap-3">
                {/* Left Side */}
                <WeeklyCard percentage={0}/>

                {/* Right Side */}
                <View className="flex-1 flex-col gap-3 w-[170px]">
                    {/* Top Right Side */}
                    <View className="flex-1 bg-[#1c1c1e] rounded-3xl justify-center items-center">
                        <Text className="text-zinc-300 font-body-bold tracking-[-0.5px] text-[20px] mt-[-4px] mb-1">
                            test
                        </Text>
                    </View>

                    {/* Bottom Right Side */}
                    <View className="flex-1 bg-[#9f7346] rounded-3xl justify-center items-center">
                        <Text className="text-zinc-300 font-body-bold tracking-[-0.5px] text-[20px] mt-[-4px] mb-1">
                            test
                        </Text>
                    </View>

                </View>
            </View>
        </View>
    );
}