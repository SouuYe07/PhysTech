import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import Header from '../components/Header.js'

export default function Home() {
  return (
    <View className="bg-black flex-1">
      <Header name="Frenemy"/>
    </View>
  );
}