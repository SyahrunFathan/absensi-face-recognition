import {SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {IlLogoInspektorat} from '../../Assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={IlLogoInspektorat} style={{width: 200, height: 200}} />
    </SafeAreaView>
  );
};

export default SplashScreen;
