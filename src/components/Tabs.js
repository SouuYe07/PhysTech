import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import Home from "../navigation/Home.js";
import Progress from "../navigation/Progress.js";
import SessionSetup from "../navigation/SessionSetup.js";
import Community from "../navigation/Community.js";
import Profile from "../navigation/Profile.js";

import HomeIcon from '../../assets/nav-icons/Home.svg';
import ProgressIcon from '../../assets/nav-icons/Progress.svg';
import CommunityIcon from '../../assets/nav-icons/Community.svg';
import ProfileIcon from '../../assets/nav-icons/Profile.svg';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
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
                paddingTop: 10,
                paddingLeft: 15,
                paddingRight: 15,
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

                return <IconComponent width={28} height={28} color={color} stroke={color} fill='none' />;
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