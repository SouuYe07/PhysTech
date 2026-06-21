import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlanFriendsCard({ activity, name, date, time }){
    return(
        <LinearGradient 
            colors={["#F0F0F0", "#8E8E93", "#434343"]} 
            start={{ x: 0.1, y: 0 }}                   
            end={{ x: 0.9, y: 1.1 }}                      
            locations={[0.3, 0.75, 1.0]}                  
            style={{ borderRadius: 24 }}
            className="flex-row w-[345px] h-[140px] mt-3 px-6"
        >
            {/* Text Details */}
            <View className="h-full justify-center flex-1 pr-2">
                <Text className="text-zinc-700 font-body-bold tracking-[-0.5px] text-[20px] mt-[-4px] mb-2">
                    Upcoming Plans
                </Text>
                <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    className="text-zinc-900 mt-[-5px] text-[21px] font-body-bold tracking-[-1px] leading-7"
                >
                    {activity} With {name}
                </Text>
                <Text className="text-black text-[18px] font-body-bold tracking-[-0.5px] leading-6 mt-1">
                    {date}  {time}
                </Text>
            </View>

            {/* View Button */}
            <View className="pl-5">
                <Pressable className="w-[70px] h-[30px] mt-8 bg-[hsl(0,0%,89%)] rounded-[8px] border-2 border-[#4C4C4C]">
                    <Text className="text-black font-body text-center leading-[25px]">
                        View
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>

        

    );
}