import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../navigation/Home.js";
import Progress from "../navigation/Progress.js";
import SessionSetup from "../navigation/SessionSetup.js";
import Community from "../navigation/Community.js";
import Profile from "../navigation/Profile.js";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Progress" component={Progress} />
            <Tab.Screen name="SessionSetup" component={SessionSetup} />
            <Tab.Screen name="Community" component={Community} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

export default Tabs