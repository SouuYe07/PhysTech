import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Chevron from '../../../assets/session-icons/chevron-down.svg';

const Dropdown = ({ options, selected, onSelect }) => {
    // isOpen stays local — the parent doesn't care whether the menu is showing
    const [isOpen, setIsOpen] = useState(false);

    // The chosen value now comes from the parent via props
    const selectedItem = selected;

    return (
        <View>
            {/* Dropdown Button */}
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <LinearGradient
                    style={{
                            borderRadius: 5,
                            height: 70,
                            borderWidth: 1,
                            borderColor: '#6A6A6A', 
                        }}
                        colors={['#0D0D0D', '#282828']}
                        start={{ x: 0.45, y: 0 }}
                        end={{ x: 0.55, y: 1 }}
                >
                    <View className="w-full justify-center items-center">
                        <View className="flex-row items-center h-full w-11/12">
                            <View className="h-12 w-12 bg-[#303030] justify-center items-center rounded-lg">
                                {selectedItem && (
                                    (() => {
                                        const CurrentIcon = selectedItem.logo;
                                        return <CurrentIcon width={30} height={30} />;
                                    })()
                                )}
                            </View>
                            <View className="ml-2">
                                <Text className="text-[#A6A3A3] font-heading text-[12px]">
                                    Type of Activity
                                </Text>
                                <Text className="text-white mt-[-8px] font-heading text-xl">
                                    {selectedItem.type}
                                </Text>
                            </View>
                            <View className="flex-1"/>
                            <Chevron className="mr-3"/>
                        </View>
                        
                    </View>
                </LinearGradient>
            </TouchableOpacity>

            {isOpen && options && (
                <View className="absolute top-[75px] w-full bg-[#121212] border border-[#303030] rounded-md z-50 p-1">
                    {options.map((item, index) => {
                        const MenuIcon = item.logo;
                        return (
                            <TouchableOpacity
                                key={index}
                                className="flex-row items-center p-3 rounded-md active:bg-[#222]"
                                onPress={() => {
                                    onSelect(item);   // tell the parent what was picked
                                    setIsOpen(false);
                                }}
                            >
                                <View className="h-8 w-8 bg-[#222] rounded justify-center items-center mr-3">
                                    <MenuIcon width={18} height={18} fill="#8B8080" />
                                </View>
                                <Text className="text-white font-heading text-base">{item.type}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default Dropdown;
