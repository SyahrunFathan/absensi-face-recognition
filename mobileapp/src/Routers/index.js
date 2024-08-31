import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen, SplashScreen} from '../Screens';
import {COLORS} from '../Assets';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          statusBarColor: COLORS.white,
          statusBarStyle: 'dark',
          contentStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
