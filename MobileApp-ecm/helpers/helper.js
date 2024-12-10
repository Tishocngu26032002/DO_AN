import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router'

export function checkLogin = async () => {
  const router = useRouter();

  const token = await AsyncStorage.getItem("userToken");
  if (!token) {
    router.replace("/auth/welcome");
  } else {
    setIsAuthenticated(true);
  }
  setLoading(false);
};
