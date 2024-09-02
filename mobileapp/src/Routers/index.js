import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AbsensiScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RiwayatScreen,
  SplashScreen,
} from '../Screens';
import {COLORS} from '../Assets';
import {IonIcon, MaterialIcon} from '../Components';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-account' : 'home-account';
            size = focused ? size + 10 : size + 3;
          } else if (route.name === 'Absensi') {
            iconName = focused ? 'face-recognition' : 'face-recognition';
            size = focused ? size + 7 : size + 3;
          } else if (route.name === 'Riwayat') {
            iconName = focused ? 'history' : 'history';
            size = focused ? size + 7 : size + 3;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle';
            size = focused ? size + 7 : size + 3;
          }

          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.primary,
        tabBarLabelStyle: {
          paddingBottom: 3,
          fontSize: 14,
        },
        tabBarStyle: {
          padding: 2,
          height: 60,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false, title: 'Beranda'}}
      />
      <Tab.Screen
        name="Absensi"
        component={AbsensiScreen}
        options={{title: 'Presensi'}}
      />
      <Tab.Screen name="Riwayat" component={RiwayatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

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
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

export default Routes;
