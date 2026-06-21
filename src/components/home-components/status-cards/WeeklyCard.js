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
            className="w-[200px] h-[260px] items-center justify-center"
        >
            <PieChart
                data={[
                    { value: percentage, color: '#FFFFFF' },
                    { value: 100 - percentage, color: '#3A3A3C' },
                ]}
                radius={70}
                innerRadius={0}
                donut={false}
                startAngle={-90}
            />

            <Text className="text-white text-[32px] font-body-bold tracking-[-1px] mt-4">
                {percentage}%
            </Text>
            <Text className="text-[#AFAFAF] text-[13px] font-body text-center px-4 mt-1">
                Of your weekly goal done
            </Text>

        </LinearGradient>
    );
}