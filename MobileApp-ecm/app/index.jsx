import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin } from '../helpers/helper';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <ScreenWrapper bg="white">
        <Text>Hello</Text>
        <Button title='Welcome' onPress={() => router.push('/home')} />
    </ScreenWrapper>
  );
}

export default Index;
