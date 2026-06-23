import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Public from '../../../assets/session-icons/Public.svg';
import Private from '../../../assets/session-icons/Private.svg';

export default function Visibility({ selected, onSelect }){
    return(
        <View>
            <Text className="font-heading text-[#A6A3A3] tracking-[0px]">
                Privacy
            </Text>
            <TouchableOpacity onPress={() => onSelect(!selected)}>
                <LinearGradient
                    style={{
                        borderRadius: 5,
                        width: 300,
                        height: 60, 
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: selected == true ? "#FFC710" : "#6A6A6A"
                    }}
                    colors={['#141414', '#1E1E1E']}
                    start={{ x: 0.45, y: 0 }}
                    end={{ x: 0.55, y: 1 }}
                >
                    <View className="h-10 w-10 bg-[#303030] justify-center items-center rounded-lg ml-3 flex-row">
                        {selected == true ? (
                            <Public/>
                        ) : (
                            <Private/>
                        )
                        }
                    </View>
                    <View className="ml-2 justify-center">
                        <Text className="text-white text-xl font-heading">
                            {selected == true ? "Public" : "Private"}                        
                        </Text>
                        <Text className="mt-[-6px] mb-[-4px] font-heading text-[#A6A3A3] text-[12px]">
                            {selected == true ? "Invite friends only" : "Anyone can see and join"}   
                        </Text>
                    </View>
                    <View className="flex-1"/>
                    <Switch 
                        disabled={true} 
                        value={selected} 
                        trackColor={{ true: '#FFC710', false: "#303030" }}
                        thumbColor='#D9D9D9' 
                        className="mr-2"
                    />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}