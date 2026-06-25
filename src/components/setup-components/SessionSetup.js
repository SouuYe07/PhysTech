import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native';

import Dropdown from './Dropdown.js';
import SessionType from './SessionType.js';
import Visibility from './Visibility.js';
import SessionName from './SessionName.js';
import Goal from './Goal.js';

import Logo from '../../../assets/system-icons/Logo.svg';
import Cycling from '../../../assets/session-icons/Cycling.svg';
import Running from '../../../assets/session-icons/Running.svg';

export default function SessionSetup({ onStart }) {
    const ActivityChoices = [
        { type: 'Running', logo: Running },
        { type: 'Cycling', logo: Cycling }
    ];

    const [activity, setActivity] = useState(ActivityChoices[0]);
    const [sessionType, setSessionType] = useState("Solo");
    const [isPublic, setPublic] = useState(true);
    const [sessionName, setSessionName] = useState('');
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [keyboardOffset, setKeyboardOffset] = useState(0);  

    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardOffset(e.endCoordinates.height / 2);
        });
        const hide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOffset(0);
        });
        return () => { show.remove(); hide.remove(); };
    }, []);

    const startRun = () => {
        onStart({ activity, sessionType, isPublic, sessionName, distance, time });
    }

    return (
        <View style={{
            width: 360,
            maxHeight: 580,
            backgroundColor: '#000',
            borderRadius: 24,
            transform: [{ translateY: -keyboardOffset }],  
            marginBottom: 50,
        }}>
            <View className="absolute top-2 h-1 w-20 bg-[#303030] rounded-md self-center z-10" />

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 20, paddingTop: 40 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Logo width={75} height={23} />
                <Text className="text-white font-heading text-[39px] tracking-[-2px] leading-[40px] mt-1">
                    Setup Session
                </Text>

                <View className="mt-2 gap-y-2">
                    <Dropdown options={ActivityChoices} selected={activity} onSelect={setActivity} />
                    <SessionType selected={sessionType} onSelect={setSessionType} />
                    <Visibility selected={isPublic} onSelect={setPublic} />
                    <SessionName selected={sessionName} onSelect={setSessionName} />
                    <Goal
                        distance={distance} onDistanceChange={setDistance}
                        time={time} onTimeChange={setTime}
                    />

                    <View className="w-full items-center mt-4">
                        <TouchableOpacity
                            className="w-[180px] h-[40px] bg-[#FFC710] rounded-3xl items-center justify-center"
                            onPress={startRun}
                        >
                            <Text className="font-heading">Start Session</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}