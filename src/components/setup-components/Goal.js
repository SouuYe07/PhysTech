import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SessionGoal({ distance, onDistanceChange, time, onTimeChange }) {
    
    const handleStep = (currentValue, step, onChange, isDecimal = false) => {
        const numericValue = parseFloat(currentValue) || 0;
        const newValue = Math.max(0, numericValue + step);
        
        if (newValue === 0 && step < 0 && currentValue === '') {
            return; 
        }

        onChange(isDecimal ? newValue.toFixed(2) : newValue.toString());
    };
    
    return (
        <View className="w-full mt-0.5">
            {/* Main Header Row */}
            <View className="flex-row justify-between items-center leading-[16px]">
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
                    {/* The relative container needs to wrap both TextInput and its absolute arrows */}
                    <View className="relative w-full justify-center">
                        <TextInput
                            className="w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg pl-3 pr-8 py-0 border border-[#3A3A3C] focus:border-[#FFC710]"
                            placeholder="0.00"
                            placeholderTextColor="#555559"
                            keyboardType="decimal-pad"
                            onChangeText={onDistanceChange}
                            value={distance}
                        />

                        <View className="absolute right-1.5 h-7 w-5 justify-between items-center py-0.5">
                            <TouchableOpacity 
                                onPress={() => handleStep(distance, 0.5, onDistanceChange, true)}
                                className="w-full h-3 justify-center items-center bg-[#2C2C2E] rounded-[3px] mb-[1px]"
                            >
                                <Text className="text-white text-[7px] font-bold">▲</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleStep(distance, -0.5, onDistanceChange, true)}
                                className="w-full h-3 justify-center items-center bg-[#2C2C2E] rounded-[3px]"
                            >
                                <Text className="text-white text-[7px] font-bold">▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Time Column */}
                <View className="flex-1">
                    <Text className="text-[#A6A3A3] text-xs pl-1">
                        Time (mins)
                    </Text>
                    {/* The relative container needs to wrap both TextInput and its absolute arrows */}
                    <View className="relative w-full justify-center">
                        <TextInput
                            className="w-full h-9 bg-[#1C1C1E] text-white text-xs rounded-lg pl-3 pr-8 py-0 border border-[#3A3A3C] focus:border-[#FFC710]"
                            placeholder="0"
                            placeholderTextColor="#555559"
                            keyboardType="number-pad" 
                            onChangeText={onTimeChange}
                            value={time}
                        />

                        <View className="absolute right-1.5 h-7 w-5 justify-between items-center py-0.5">
                            <TouchableOpacity 
                                onPress={() => handleStep(time, 1, onTimeChange, false)}
                                className="w-full h-3 justify-center items-center bg-[#2C2C2E] rounded-[3px] mb-[1px]"
                            >
                                <Text className="text-white text-[7px] font-bold">▲</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleStep(time, -1, onTimeChange, false)}
                                className="w-full h-3 justify-center items-center bg-[#2C2C2E] rounded-[3px]"
                            >
                                <Text className="text-white text-[7px] font-bold">▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}