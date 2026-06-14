import { registerRootComponent } from 'expo';
import './global.css';

import Home from './src/navigation/Home.js';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Home);
