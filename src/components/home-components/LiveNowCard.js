import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveNowCard({ friends, area }) {
    return(
        <LinearGradient 
			colors={["#0D0D0D", "#262626"]}
			start={{ x: 0.3, y: 0 }}
			end={{ x: 0.7, y: 1 }}
			style= {{ borderRadius: 20 }}
			className="flex-row w-[92%] h-[140px] mt-3"
		>
			
            {/* Text */}
            <View className="h-full justify-center gap-y-1 px-6 flex-1">
                <Text className="text-[#AFAFAF] font-body-semibold tracking-[-1px] text-[20px] mt-[-4px]">
                    Live Now
                </Text>
				<Text className="text-white text-[26px] font-body-bold leading-[36px] tracking-[-1px]" numberOfLines={2}>
                    {friends} Friends 
					{"\n"}
                    {area} in your area
                </Text>
            </View>

            {/* See All Button */}
			<View className="pl-2 pr-4">
				<Pressable 
					style={{
						shadowColor: "#000",
						shadowOffset: { width: 0, y: 3 },
						shadowOpacity: 0.4,
						shadowRadius: 4,
						elevation: 5,
					}}
					className="w-[70px] h-[30px] mt-8 bg-[#212121] rounded-[8px] border-2 border-[#6D6D6D]"
					>
					<Text className="text-white font-body text-center leading-[25px]">
						See All
					</Text>
				</Pressable>
			</View>
        </LinearGradient>
    );
}
