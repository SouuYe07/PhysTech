import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlanFriendsCard({ activity, name, date, time }){
    return(
        <LinearGradient 
            colors={["#434343", "#F0F0F0"]} 
            start={{ x: 0.23, y: -0.6}}
			end={{ x: 0.6, y: 1 }}                  
            style={{ borderRadius: 20 }}
            className="flex-row w-[92%] h-[133px] mt-3 px-6"
        >
            {/* Text Details */}
            <View className="h-full justify-center flex-1 pr-2">
                <Text className="text-[#FFFFFF] font-body-bold tracking-[-1px] text-[20px] mt-[4px]">
                    Upcoming Plans
                </Text>
                <Text className="text-black mt-0 text-[23px] font-body-bold tracking-[-1px] leading-8 pb-[4px]">
                    {activity} with {name}
                </Text>
                <Text className="text-black text-[18px] font-body-bold tracking-[-0.5px] leading-6 mt-[-4px]">
                    {date}  {time}
                </Text>
            </View>

            {/* View Button */}
            <View className="pl-2 overflow-visible">
                <Pressable className="w-[70px] h-[30px] mt-8 bg-[rgba(255,255,255,0.2)] rounded-[8px] border-2 border-[#4C4C4C] justify-center items-center">
                    <Text className="text-black font-body text-center leading-[22px]">
                        View
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>

        

    );
}
