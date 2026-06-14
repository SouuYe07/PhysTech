import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import Home from "../navigation/Home.js";
import Progress from "../navigation/Progress.js";
import SessionSetup from "../navigation/SessionSetup.js";
import Community from "../navigation/Community.js";
import Profile from "../navigation/Profile.js";

import HomeIcon from '../../assets/Home.svg';
import ProgressIcon from '../../assets/Progress.svg';
import CommunityIcon from '../../assets/Community.svg';
import ProfileIcon from '../../assets/Profile.svg';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        // 2. Added ({ route }) here so your icon mapping can read the screen names!
        <Tab.Navigator screenOptions={({ route }) => ({ 
            headerShown: false,
            tabBarBackground: () => (
                <LinearGradient
                    colors={['#101010', '#202020']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            tabBarActiveTintColor: '#FFC710',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarStyle: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                position: 'absolute',
                height: 90,
                paddingBottom: 2,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 25,
                overflow: 'hidden'
            },
            tabBarIcon: ({ color }) => {
                const IconComponent = 
                    route.name === 'Home' ? HomeIcon :
                    route.name === 'Progress' ? ProgressIcon :
                    route.name === 'Community' ? CommunityIcon :
                    route.name === 'Profile' ? ProfileIcon : 
                    null;

                if (!IconComponent) return null;

                return <IconComponent width={30} height={30} color={color} stroke={color} fill='none' />;
            }
        })}>

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Progress" component={Progress} />
            <Tab.Screen name="Session" component={SessionSetup} />
            <Tab.Screen name="Community" component={Community} />
            <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
    )
}

export default Tabs