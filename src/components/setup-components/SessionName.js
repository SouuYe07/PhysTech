// sessionname.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function SessionName({ selected, onSelect, error }) {
  return (
    <View className="w-full gap-y-1 mt-1">
        <View className="flex-row justify-between items-center">
            <Text className="font-heading text-[#A6A3A3] tracking-[0px] leading-[14px]">
            User Name
            </Text>
            <Text className={`text-xs font-medium tracking-[0px] leading-[12px] ${error ? 'text-[#FF4D4D]' : 'text-[#555559]'}`}>
            (Required)
            </Text>
      </View>
      <TextInput
        className={`w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg px-3 py-0 border ${error ? 'border-[#FF4D4D]' : 'border-[#3A3A3C]'}`}
        placeholder="Enter your name..."
        placeholderTextColor="#555559"
        onChangeText={onSelect}
        value={selected}
      />
      {error && (
        <Text className="text-[#FF4D4D] text-xs tracking-[0px] leading-[12px]">
          Please enter your name to start.
        </Text>
      )}
    </View>
  );
}
