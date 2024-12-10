import React from 'react'
import { View, StyleSheet, Image, Text, Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import { useRouter } from 'expo-router';
import Button from '../../components/Button'
import ScreenWrapper from '../../components/ScreenWrapper'

const welcome = () => {
    const router = useRouter();
  return (
    <ScreenWrapper bg="white">
        <StatusBar style="dark" />
        <View style={styles.container}>

            {/* welcomeImage */}
            <Image style={styles.welcomeImage} resizeMode='contain'
            source={require('../../assets/images/welcome-image.jpg')} />

            {/* title */}
            <View style={{gap: 20}}>
                <Text style={styles.title}>Đại Lý Cám!</Text>
                <Text style={styles.punchline}>
                    Chuyên cung cấp cám gia cầm, gia súc giá cả hợp lý, chất lượng hàng đầu
                </Text>
            </View>

            {/* footer */}
            <View style={styles.footer}>
                <Button
                    title="Login"
                    buttonStyle={{marginHorizontal: wp(2.5), cursor: 'pointer'}}
                    onPress={() => router.push('/auth/login')}
                />
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      paddingHorizontal: wp(4),
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center'
    },
    title: {
        coloe: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        fontSize: hp(1.7),
        textAlign: 'center',
        paddingHorizontal: wp(10),
        color: theme.colors.text
    },
    footer: {
        gap: 30,
        width: '80%'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6),
    }
  });