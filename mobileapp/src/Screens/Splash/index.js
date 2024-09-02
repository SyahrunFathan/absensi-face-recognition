import {SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {IlLogoInspektorat} from '../../Assets';
import {getItem, removeTokenApi} from '../../Utils';
import {jwtDecode} from 'jwt-decode';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const AmbilData = async () => {
      const response = await getItem('profile');
      setTimeout(async () => {
        if (response) {
          const decode = jwtDecode(response?.token);
          const currentDate = new Date();
          if (decode.exp * 1000 < currentDate.getTime()) {
            const res = await removeTokenApi(decode.userId);
            if (res.status === 200) {
              navigation.replace('Login');
            }
          } else {
            navigation.replace('Main');
          }
        } else {
          navigation.replace('Login');
        }
      }, 1500);
    };

    // const AmbilData = async () => {
    //   setTimeout(() => {
    //     navigation.replace('Login');
    //   }, 1500);
    // };
    AmbilData();
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={IlLogoInspektorat} style={{width: 200, height: 200}} />
    </SafeAreaView>
  );
};

export default SplashScreen;
