import React, { useRef, useState } from 'react'
import { View, StyleSheet, Image, Text, Pressable, Alert } from 'react-native'
import ScreenWrapper from '../ScreenWrapper'
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { StatusBar } from 'expo-status-bar'
import BackButton from '../BackButton';
import { wp, hp } from '../../helpers/common';
import Input from '../Input';
import Button from '../Button';
import { loginAuth } from '../../service/AuthService';

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current.trim() || !passwordRef.current.trim()) {
            Alert.alert('Login', "Vui lòng điền đầy đủ thông tin!");
            return;
        }
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
        setLoading(true);
        try {
            const response = await loginAuth(email, password);
            const result = response.data;
            setLoading(false);
            if (result != null && result.status === 200) {
                if(result.data.user.role == "admin"){
                    router.replace("/home");
                }
                else{
                    Alert.alert("Không có quyền", "Bạn không có quyền đăng nhập với tài khoản này!");
                }
            } else {
                Alert.alert("Đăng nhập lỗi", "Tài khoản hoặc mật khẩu sai!");
            }
        } catch (error) {
            setLoading(false);
            console.error("API error:", error);
            Alert.alert("Đăng nhập lỗi", "Đăng nhập không thành công, vui lòng thử lại!");
        }
    };
    

  return (
    <ScreenWrapper bg='white'>
        <StatusBar style='dark' />
        <View style={styles.container}>
            <BackButton router={router} />

            {/* welcome */}
            <View>
                <Text style={styles.welcomeText}>Chào mừng</Text>
                <Text style={styles.welcomeText}>Bạn quay trở lại ^^</Text>
            </View>

            {/* form */}
            <View style={styles.form}>
                <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                    Đăng nhập để tiếp tục
                </Text>
                <Input
                    icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                    placeholder='Nhập email'
                    onChangeText={value=> emailRef.current = value}
                />
                <Input
                    icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                    placeholder='Nhập mật khẩu'
                    onChangeText={value=> passwordRef.current = value}
                />
                <Text style={styles.forgotPassword}>
                    Quên mật khẩu?
                </Text>

                {/* Button */}
                <Button title={'Đăng nhập'} loading={loading} onPress={onSubmit}   />
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(4),
      },
      welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
      },
      form: {
        gap: 25
      },
      forgotPassword:{
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
      }
})