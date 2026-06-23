    import React, { useState } from 'react';
    import { View, Text, TouchableOpacity, Modal } from 'react-native';
    import { LinearGradient } from 'expo-linear-gradient';

    const Dropdown = ({ options }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState(options && options.length > 0 ? options[0] : null);

        return (
            <View>
                {/* Dropdown Button */}
                <TouchableOpacity>
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
                                    <View className="h-10 w-10 bg-[#303030] justify-center items-center rounded-lg">
                                        {selectedItem && (
                                            (() => {
                                                const CurrentIcon = selectedItem.logo;
                                                return <CurrentIcon width={25} height={25} />;
                                            })()
                                        )}
                                    </View>
                            </View>
                       </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };

    export default Dropdown;
