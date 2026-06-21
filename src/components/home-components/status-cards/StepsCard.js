import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WeeklyCard({ percentage }){
    return(
        <LinearGradient
            colors={["#050505", "#333333"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style= {{ borderRadius: 20 }}
            className="w-[200px] h-[260px]"
        >
            
        </LinearGradient>
    );
}