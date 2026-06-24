import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Pause from '../../assets/session-icons/Pause.svg';
import Resume from '../../assets/session-icons/Resume.svg';
import Stop from '../../assets/session-icons/Stop.svg';

export default function SessionControl({ isPaused, onPaused, onStop }){
    return(
        <View className="absolute bottom-16 w-full flex-row justify-between px-10">
            <TouchableOpacity onPress={onPaused}>
                <LinearGradient
                    style={{
                        overflow: 'hidden',
                        height: 50,
                        width: 140,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: isPaused ? "#F6F6F6" : "#6E6E6E",
                        justifyContent: 'center', 
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 16
                    }}
                    colors={isPaused ? ['#000000', '#262626'] : ['#C8C8C8', '#999999']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {isPaused ? ( 
                        <>
                            <Pause/> 
                            <Text className="text-white font-body-bold">
                                Pause
                            </Text>
                        </>
                    ) : (
                         <>
                            <Resume/> 
                            <Text className="text-[#141414] font-body-bold">
                                Resume
                            </Text>
                        </>        
                        )}
                    
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={onStop}>
                <LinearGradient
                    style={{
                        overflow: 'hidden',
                        height: 50,
                        width: 140,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: "#F5F5F5",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 8
                    }}
                    colors={['#FFC710', '#DFBE52']}
                    start={{ x: 0.4, y: 0 }}
                    end={{ x: 0.6, y: 1 }}
                >
                    <Stop/>
                    <Text className="text-black font-body-bold">
                        End Session
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}