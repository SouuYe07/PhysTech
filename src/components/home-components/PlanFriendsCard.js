import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlanFriendsCard({ activity, name, date, time }){
    return(
        <LinearGradient 
            colors={["#434343", "#F0F0F0"]}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 1 }}
            style= {{ borderRadius: 20 }}
            className="flex-row w-[345px] h-[140px] mt-3 item-center"
        >
            {/* Text Details */}
            <View className="h-full justify-center px-6 w-[240px]">
                <Text className="text-white font-body-bold tracking-[-1px] text-[19px] mt-[-4px]">
                    Upcoming Plans
                </Text>
                <Text className="text-[#0B0B0B] mt-[-5px] text-[22px] font-body-bold tracking-[-1px]">
                    {activity} With {name}
                </Text>
                <Text className="text-[#0B0B0B] mt-[-10px] text-[20px] font-body-bold tracking-[-1px]">
                    {date}  {time}
                </Text>
            </View>

            {/* View Button */}
            <View className="pl-5">
                <Pressable className="w-[70px] h-[30px] mt-8 bg-[#E4E4E4] rounded-[8px] border-2 border-[#4C4C4C]">
                    <Text className="text-black font-body text-center leading-[25px]">
                        View
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>

        

    );
}