import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Solo from '../../../assets/session-icons/Solo.svg';
import Group from '../../../assets/session-icons/Group.svg';

export default function SessionType(){    
    const [selectedType, setSelectedType] = useState("Solo");

    const handleSelect = (type) => {
        setSelectedType(type)
    }

    return(
        <View>
            <Text className="font-heading text-[#A6A3A3] tracking-[0px]">
                Session Type
            </Text>
            <View className="w-full h-16 bg-[#303030] rounded-lg flex-row justify-center gap-x-[6px]">
                <TouchableOpacity className="w-[48%] items-center justify-center flex-row" onPress={() => setSelectedType("Solo")}>
                    <LinearGradient
                        style={{
                            borderRadius: 5,
                            height: '90%',
                            width: '95%', 
                            overflow: 'hidden',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderColor: selectedType === "Solo" ? "#FFC710" : "#6A6A6A"
                        }}
                        colors={['#141414', '#1E1E1E']}
                        start={{ x: 0.45, y: 0 }}
                        end={{ x: 0.55, y: 1 }}
                    >
                        <View className="h-10 w-10 bg-[#303030] justify-center items-center rounded-lg ml-3 flex-row">
                            <Solo color={selectedType == "Group" ? "#FFC710" : "#808080"}/>
                        </View>
                        <Text className={`font-heading text-xl ml-2 ${selectedType === "Solo" ? "text-[#FFC710]" : "text-[#808080]"}`}>
                            Solo
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View className="h-full w-[1px] bg-black"/>
                <TouchableOpacity className="w-[48%] items-center justify-center flex-row" onPress={() => setSelectedType("Group")}>
                    <LinearGradient
                        style={{
                            borderRadius: 5,
                            height: '90%',
                            width: '95%', 
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: selectedType === "Group" ? "#FFC710" : "#6A6A6A"
                        }}
                        colors={['#141414', '#1E1E1E']}
                        start={{ x: 0.45, y: 0 }}
                        end={{ x: 0.55, y: 1 }}
                    >
                        <View className="h-10 w-10 bg-[#303030] justify-center items-center rounded-lg ml-3 flex-row">
                            <Group color={selectedType == "Group" ? "#FFC710" : "#808080"}/>
                        </View>
                        <Text className={`font-heading text-xl ml-2 ${selectedType === "Solo" ? "text-[#FFC710]" : "text-[#808080]"}`}>
                            Group
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}