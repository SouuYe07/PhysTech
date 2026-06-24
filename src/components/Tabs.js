import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigationState } from '@react-navigation/native'

import { tabBarStyle } from './TabBarStyle.js';

import Home from "../navigation/Home.js";
import Progress from "../navigation/Progress.js";
import SessionMap from "../navigation/SessionMap.js";
import Community from "../navigation/Community.js";
import Profile from "../navigation/Profile.js";

import HomeIcon from '../../assets/nav-icons/Home.svg';
import ProgressIcon from '../../assets/nav-icons/Progress.svg';
import SessionIcon from '../../assets/nav-icons/Session.svg';
import CommunityIcon from '../../assets/nav-icons/Community.svg';
import ProfileIcon from '../../assets/nav-icons/Profile.svg';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator initialRouteName="Session" screenOptions={({ route }) => ({
            headerShown: false,
            tabBarBackground: () => (
                <LinearGradient
                    style={{
                        overflow: 'hidden',
                        borderRadius: 25,
                        flex: 1
                    }}
                    colors={['#101010', '#202020']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            tabBarLabelStyle: {
                fontFamily: 'Lexend-Bold',
                fontSize: 10
            },
            tabBarActiveTintColor: '#FFC710',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarStyle: tabBarStyle,
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
            <Tab.Screen name="Session" component={SessionMap}
                options={{
                    tabBarButton: (props) => {
                        const currentRoute = useNavigationState(state => state.routes[state.index].name);
                        const active = currentRoute === 'Session';
                        const color = active ? "#FFC710" : "#FFFFFF";
                        const glow = active ? "0px 0px 35px #FFC710" : "none";

                        return(
                            <TouchableOpacity
                                {...props}
                                style={{
                                    top: -35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={{
                                    width: 58,
                                    height: 50,
                                    backgroundColor: '#FFC710',
                                    elevation: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 40,
                                    boxShadow: glow,
                                }}>
                                    <SessionIcon width={35} height={35}></SessionIcon>
                                </View>
                                <Text style={{color, fontSize: 10, fontFamily: 'Lexend-Bold'}}>
                                    Session
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <Tab.Screen name="Community" component={Community} />
            <Tab.Screen name="Profile" component={Profile} />

        </Tab.Navigator>
    )
}

export default Tabs
