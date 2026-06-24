import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function SessionGoal({ distance, onDistanceChange, time, onTimeChange }) {
  return (
    <View className="w-full mt-0.5">
      {/* Main Header Row */}
      <View className="flex-row justify-between items-center leading-[16px] ">
        <Text className="font-heading text-[#A6A3A3] tracking-[0px] leading-[20px]">
            Goal
        </Text>
        <Text className="text-[#555559] text-xs font-medium tracking-[0px] leading-[12px]">
          (Optional)
        </Text>
      </View>

      {/* Two Columns Side-by-Side */}
      <View className="flex-row justify-between gap-x-3 -mt-0.5">
        
        {/* Distance Column */}
        <View className="flex-1">
          <Text className="text-[#A6A3A3] text-xs pl-1">
            Distance (km)
          </Text>
          <TextInput
            className="w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg px-3 py-0 border border-[#3A3A3C] focus:border-[#FFC710]"
            placeholder="0.00"
            placeholderTextColor="#555559"
            keyboardType="decimal-pad" // Shows numeric keyboard with decimal point
            onChangeText={onDistanceChange}
            value={distance}
          />
        </View>

        {/* Time Column */}
        <View className="flex-1">
          <Text className="text-[#A6A3A3] text-xs pl-1">
            Time (mins)
          </Text>
          <TextInput
            className="w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg px-3 py-0 border border-[#3A3A3C] focus:border-[#FFC710]"
            placeholder="0"
            placeholderTextColor="#555559"
            keyboardType="number-pad" // Shows pure numeric keyboard
            onChangeText={onTimeChange}
            value={time}
          />
        </View>

      </View>
    </View>
  );
}