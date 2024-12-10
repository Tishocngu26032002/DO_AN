import { Tabs, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { checkLogin } from '../helpers/helper';

const TabLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkLogin();
  }, [router]);

  return (
    <Tabs screenOptions={{headerShown: false,
      tabBarActiveTintColor: '#008000',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: 'white' },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),         
        }}
      />
      <Tabs.Screen
        name="delivery"
        options={{
          title: "Delivery",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Ẩn khỏi navbar */}
      <Tabs.Screen
        name="auth/login"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="auth/welcome"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
