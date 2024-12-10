import React, { useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { View, Text } from "react-native";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin } from '../helpers/helper';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <ScreenWrapper>
      <View>
        <BackButton router={router} />
        <Text>Home</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
