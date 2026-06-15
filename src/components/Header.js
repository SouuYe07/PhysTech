import React from 'react';
import { View, Text } from 'react-native';

import Logo from '../../assets/system-icons/Logo.svg';
import Map from '../../assets/header-icons/Map.svg';
import Notification from '../../assets/header-icons/Notification.svg'

export default function Header({ name }){
    return(
        <View className="mt-16 justify-between flex-row px-7">
            {/* Logo with greeting text */}
            <View>
                <Logo width={60} height={23}/>
                <View className="flex-row">
                    <Text className="text-white font-heading text-4xl tracking-[-2px]">
                        Hello,
                    </Text>
                    <Text className="text-[#FFC710] font-heading text-4xl tracking-[-2px]">
                        {name}
                    </Text>
                </View>
            </View>

            {/* Two Buttons */}
            <View className="flex-row items-center h-max gap-x-3">
                <Map />
                <Notification />
            </View>
        </View>
    );
}
