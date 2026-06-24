import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-gifted-charts';

export default function WeeklyCard({ percentage }){
    return(
        <LinearGradient
            colors={["#050505", "#333333"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style= {{ borderRadius: 20 }}
            className="w-full h-full items-center justify-center pt-2"
        >
            <PieChart
                data={[
                    { value: percentage, color: '#FFFFFF' },
                    { value: 100 - percentage, color: '#3A3A3C' },
                ]}
                radius={60}
                innerRadius={0}
                donut={false}
                startAngle={-90}
            />

            <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px] mt-2">
                {percentage}%
            </Text>
            <Text className="text-white text-[11px] font-body-semibold text-center px-4">
                Of your weekly goal done
            </Text>

        </LinearGradient>
    );
}
