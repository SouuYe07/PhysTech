import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

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

    // ── State lives HERE in the parent, one per child ──
    const [activity, setActivity] = useState(ActivityChoices[0]);  // for Dropdown
    const [sessionType, setSessionType] = useState("Solo");        // for SessionType
    const [isPublic, setPublic] = useState(true);
    const [sessionName, setSessionName] = useState('');
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');

    const startRun = () => {
        onStart({ activity, sessionType, isPublic, sessionName, distance, time });
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="w-[360px] h-[555px] bg-black rounded-3xl items-center"
        >
        
            <View className="w-[360px] h-[555px] bg-black rounded-3xl items-center">
                <View className="h-1 w-20 bg-[#303030] mt-2 shadow-sm shadow-gray-600 rounded-md"/>

                <View className="h-full w-10/12 mt-10">
                    <Logo width={75} height={23}/>
                    <Text className="text-white font-heading text-[39px] tracking-[-2px] leading-[40px] mt-1">
                        Setup Session
                    </Text>

                    <View className="mt-2 gap-y-2">
                        {/* Dropdown: give it the value + a way to change it */}
                        <Dropdown
                            options={ActivityChoices}
                            selected={activity}
                            onSelect={setActivity}
                        />

                        {/* SessionType: same pattern — value down, setter down */}
                        <SessionType
                            selected={sessionType}
                            onSelect={setSessionType}
                        />

                        <Visibility
                            selected={isPublic}
                            onSelect={setPublic}
                        />

                        <SessionName
                            selected={sessionName}
                            onSelect={setSessionName}
                        />

                        <Goal
                            distance={distance}
                            onDistanceChange={setDistance}
                            time={time}
                            onTimeChange={setTime}
                        />

                        <View className="w-full items-center mt-6">
                            <TouchableOpacity className="w-[180px] h-[40px] bg-[#FFC710] rounded-3xl items-center justify-center" onPress={startRun}>
                                <Text className="font-heading">
                                    Start Session
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}
