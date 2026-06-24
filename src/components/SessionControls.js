import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SessionControl({ isPaused, onPause, onResume, onStop }){
    return(
        <View className="absolute bottom-0 w-full bg-white">
            <Text className="text-white text-xl">Test</Text>
        </View>
    );
}