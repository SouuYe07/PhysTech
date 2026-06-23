import React from 'react';
import { View, Text } from 'react-native';
import { Footprints } from 'lucide-react-native';

export default function StepsCard({ steps }) {
    const formattedSteps = steps.toLocaleString();

    return (
        <View className="flex-1 bg-[#1c1c1e] rounded-3xl justify-center px-4 py-3">
            <View className="flex-row items-center justify-between">
                
                {/* Text Container Layer */}
                <View className="relative justify-center">
                    {/* BACK LAYER 3: Outer Glow Aura */}
                    <Text className="absolute text-[#FFC107]/20 text-[32px] font-body-bold tracking-[-1px] blur-sm scale-110">
                        {formattedSteps}
                    </Text>

                    {/* BACK LAYER 2: Tight Glow Aura */}
                    <Text className="absolute text-[#FFC107]/40 text-[32px] font-body-bold tracking-[-1px] blur-[2px]">
                        {formattedSteps}
                    </Text>

                    {/* FRONT LAYER 1: Crisp Sharp Core Text */}
                    <Text className="text-[#FFC107] text-[32px] font-body-bold tracking-[-1px]">
                        {formattedSteps}
                    </Text>
                </View>
                
                <Footprints size={16} color="#FFC107" />
            </View>
            
            <Text className="text-white text-[12px] font-body-semibold mt-1">
                the past week
            </Text>
        </View>
    );
}