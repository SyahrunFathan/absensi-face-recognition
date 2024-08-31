import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, IlLogoInspektorat} from '../../Assets';
import {IonIcon} from '../../Components';

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    username: '',
    password: '',
  });

  const HandleLogin = () => {
    if (formData.username === '')
      return setFormError({username: 'Username tidak boleh kosong!'});
    if (formData.password === '')
      return setFormError({password: 'Password tidak boleh kosong!'});

    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentHeader}>
            <Image source={IlLogoInspektorat} style={{width: 80, height: 80}} />
          </View>
          <View style={styles.contentBody}>
            <View style={styles.body}>
              <Text style={styles.textBold}>LOGIN</Text>
              <Text style={styles.textNormal}>
                Selamat datang di Aplikasi Absensi Inspektorat Sulawesi Tengah!
              </Text>
            </View>
          </View>
          <View style={styles.contentFooter}>
            <View style={{padding: 20, flex: 1}}>
              <View style={{gap: 7, marginBottom: 20}}>
                <Text style={styles.textLabel}>Username :</Text>
                <View style={styles.formControl}>
                  <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor={COLORS.grey}
                    style={[
                      styles.formInput,
                      formError.username && {borderColor: COLORS.red},
                    ]}
                    maxLength={20}
                    value={formData.username}
                    keyboardType="numeric"
                    onChangeText={text =>
                      setFormData({...formData, username: text})
                    }
                  />
                  <View style={styles.iconForm}>
                    <IonIcon name={'person'} size={20} color={COLORS.grey} />
                  </View>
                </View>
                {formError.username && (
                  <View style={{marginTop: -3}}>
                    <Text style={{color: COLORS.red}}>
                      {formError.username}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{gap: 7, marginBottom: 20}}>
                <Text style={styles.textLabel}>Password :</Text>
                <View style={styles.formControl}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.grey}
                    style={[
                      styles.formInput,
                      formError.password && {borderColor: COLORS.red},
                    ]}
                    maxLength={20}
                    keyboardType="ascii-capable"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconForm}>
                    {showPassword ? (
                      <IonIcon name={'eye'} size={20} color={COLORS.grey} />
                    ) : (
                      <IonIcon name={'eye-off'} size={20} color={COLORS.grey} />
                    )}
                  </TouchableOpacity>
                </View>
                {formError.password && (
                  <View style={{marginTop: -3}}>
                    <Text style={{color: COLORS.red}}>
                      {formError.password}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.buttonLogin} onPress={HandleLogin}>
          <Text style={styles.textButton}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentHeader: {
    backgroundColor: COLORS.primary,
    width: 120,
    borderBottomEndRadius: 80,
  },
  contentBody: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  body: {
    alignItems: 'center',
    width: 280,
  },
  textBold: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.greyOld,
  },
  textNormal: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    color: COLORS.greyOld,
  },
  contentFooter: {
    flex: 1,
    borderWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderColor: COLORS.grey,
  },
  textLabel: {
    fontSize: 20,
    color: COLORS.black,
  },
  formControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formInput: {
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 18,
    borderRadius: 8,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    width: '100%',
    paddingRight: 40,
  },
  iconForm: {
    position: 'absolute',
    right: 12,
  },
  buttonLogin: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  textButton: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
