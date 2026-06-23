import React from 'react';
import { View, Text } from 'react-native';

import Dropdown from './Dropdown.js';
import SessionType from './SessionType.js';

import Logo from '../../../assets/system-icons/Logo.svg';
import Cycling from '../../../assets/session-icons/Cycling.svg';
import Running from '../../../assets/session-icons/Running.svg';

export default function SessionSetup() {
    const ActivityChoices = [
        { type: 'Running', logo: Running },
        { type: 'Cycling', logo: Cycling }
    ];

    return (
        <View className="w-[360px] h-[555px] bg-black rounded-3xl items-center">
            <View className="h-1 w-20 bg-[#303030] mt-2 shadow-sm shadow-gray-600 rounded-md"/>

            <View className="h-full w-10/12 mt-10">
                <Logo width={75} height={23}/>
                <Text className="text-white font-heading text-5xl tracking-[-2px]">
                    Setup Session
                </Text>

                <View className="mt-5 gap-y-4">
                    <Dropdown options={ActivityChoices} />
                    <SessionType />
                </View>

                
            </View>
        </View>
    );
}
