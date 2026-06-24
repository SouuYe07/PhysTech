// sessionname.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function SessionName({ selected, onSelect }) {
  return (
    <View className="w-full gap-y-1">
      <Text className="font-heading text-[#A6A3A3] tracking-[0px] leading-[16px]">
            Session Name
        </Text>
      <TextInput
        className="w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg px-3 py-0 border border-[#3A3A3C] focus:border-[#FFC710]"
        placeholder="Enter session name..."
        placeholderTextColor="#555559"
        onChangeText={onSelect}
        value={selected}
      />
    </View>
  );
}