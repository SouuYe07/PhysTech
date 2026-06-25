import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function formatDuration(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function StatCard({ label, value, unit }) {
    return (
        <LinearGradient
            className="flex-1 h-20 rounded-[15px] border border-neutral-800 overflow-hidden justify-center items-center mx-1 py-2 px-1"
            colors={['#000000', '#262626']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text className="text-gray-400 text-[10px] font-semibold tracking-[0.5px] uppercase mb-1">
                {label}
            </Text>
            <View className="flex-row items-baseline">
                <Text 
                    className="text-[#FFC710] font-body-bold text-[18px] tracking-[0.5px]" 
                    adjustsFontSizeToFit 
                    numberOfLines={1}
                >
                    {value}
                </Text>
                {unit && (
                    <Text className="text-gray-400 font-body-bold text-[11px] ml-0.5">
                        {unit}
                    </Text>
                )}
            </View>
        </LinearGradient>
    );
}

export default function SessionProgress({ duration = 0, distance = 0, pace = 0, isPaused = false }) {
    const formattedPace = (!pace || pace === Infinity) ? '--.-' : pace.toFixed(2);

    return (
        <View 
            className="absolute top-0 left-0 right-0 z-10 pt-12 px-3 pb-3 flex-row" 
            pointerEvents="none"
        >
            <StatCard label="Duration" value={formatDuration(duration)} />
            <StatCard label="Distance" value={distance.toFixed(2)} unit="km" />
            <StatCard label="Pace" value={formattedPace} unit="/km" />
        </View>
    );
}