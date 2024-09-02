import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, IlDefault, IlLogoInspektorat} from '../../Assets';
import LinearGradient from 'react-native-linear-gradient';
import {IonIcon, MaterialIcon} from '../../Components';

const HomeScreen = () => {
  const timeZoneOffset = 8 * 60 * 60 * 1000; // UTC+8 hours in milliseconds
  const timeZoneAbsen = 24 * 60 * 60 * 1000; // UTC+8 hours in milliseconds

  const formatTime = (hours, minutes) => {
    const time = new Date();
    time.setUTCHours(hours, minutes, 0, 0); // Set UTC time
    return new Date(time.getTime() + timeZoneAbsen); // Adjust to Asia/Makassar time
  };

  const startTimeAbsen = formatTime(2, 21);
  const endTimeAbsen = formatTime(2, 25);
  const timeAkhirAbsen = formatTime(2, 26);
  const endAbsen = formatTime(2, 30);

  const dayAbsen = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Minggu'];

  const today = new Date();
  const localTime = new Date(today.getTime() + timeZoneOffset);

  const currentDay = localTime.toLocaleDateString('id-ID', {weekday: 'long'});
  const currentDate = localTime.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const AbsenStatus = () => {
    return (
      <>
        <Text style={styles.textWhiteBold}>Absen Masuk Dimulai</Text>
        <Text style={styles.textWhiteBold}>
          Pukul{' '}
          {startTimeAbsen.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {endTimeAbsen.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          WITA
        </Text>
      </>
    );
  };

  const AbsenPulanganStatus = () => {
    return (
      <>
        <Text style={styles.textWhiteBold}>Absen Pulang Dimulai</Text>
        <Text style={styles.textWhiteBold}>
          Pukul{' '}
          {timeAkhirAbsen.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {endAbsen.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          WITA
        </Text>
      </>
    );
  };

  const shouldShowAbsenStatus =
    localTime >= startTimeAbsen && localTime <= endTimeAbsen;
  const shouldShowAbsenPulanganStatus =
    localTime >= timeAkhirAbsen && localTime <= endAbsen;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={IlLogoInspektorat} style={styles.logo} />
          <Text style={styles.headerTitle}>
            Sib<Text style={styles.headerTitleAccent}>ensi</Text>
          </Text>
        </View>
        <View style={styles.welcomeSection}>
          <Image source={IlDefault} style={styles.profileImage} />
          <View>
            <Text style={styles.welcomeText}>Selamat Datang!</Text>
            <Text style={styles.username}>Djafar Siddiq Assegaf</Text>
          </View>
        </View>
      </View>
      <LinearGradient colors={['#2e1ba2', '#4e4e51']} style={styles.gradient}>
        <View style={styles.statsContainer}>
          <StatCard
            icon={<IonIcon name={'person-outline'} size={30} />}
            label="Hadir"
          />
          <StatCard
            icon={<MaterialIcon name={'emoticon-sick-outline'} size={30} />}
            label="Sakit"
          />
          <StatCard
            icon={<MaterialIcon name={'clock-outline'} size={30} />}
            label="Izin"
          />
        </View>
        <View style={styles.dateSection}>
          <View>
            <Text
              style={styles.dateText}>{`${currentDay}, ${currentDate}`}</Text>
            {dayAbsen.includes(currentDay) && (
              <>
                {shouldShowAbsenStatus ? (
                  <AbsenStatus />
                ) : shouldShowAbsenPulanganStatus ? (
                  <AbsenPulanganStatus />
                ) : (
                  <Text style={styles.textWhiteBold}>
                    Tidak Ada Jam Absen Saat Ini
                  </Text>
                )}
              </>
            )}
          </View>
          {dayAbsen.includes(currentDay) && (
            <>
              {shouldShowAbsenStatus ? (
                <TouchableOpacity
                  style={[
                    styles.buttonCheck,
                    {backgroundColor: COLORS.success},
                  ]}>
                  <Text style={styles.textButton}>Check In</Text>
                </TouchableOpacity>
              ) : shouldShowAbsenPulanganStatus ? (
                <TouchableOpacity
                  style={[styles.buttonCheck, {backgroundColor: COLORS.red}]}>
                  <Text style={styles.textButton}>Check Out</Text>
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </View>
      </LinearGradient>
      <View style={styles.contentCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 10}}>
            <View style={styles.cardAbsensi}>
              <Image source={IlDefault} style={styles.profileImage} />
              <View>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '700'},
                  ]}>
                  Djafar Siddiq Assegaf
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Pukul: 07.00 WITA
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Hadir
                </Text>
              </View>
            </View>
            <View style={styles.cardAbsensi}>
              <Image source={IlDefault} style={styles.profileImage} />
              <View>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '700'},
                  ]}>
                  Djafar Siddiq Assegaf
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Pukul: 07.00 WITA
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Hadir
                </Text>
              </View>
            </View>
            <View style={styles.cardAbsensi}>
              <Image source={IlDefault} style={styles.profileImage} />
              <View>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '700'},
                  ]}>
                  Djafar Siddiq Assegaf
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Pukul: 07.00 WITA
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Hadir
                </Text>
              </View>
            </View>
            <View style={styles.cardAbsensi}>
              <Image source={IlDefault} style={styles.profileImage} />
              <View>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '700'},
                  ]}>
                  Djafar Siddiq Assegaf
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Pukul: 07.00 WITA
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Hadir
                </Text>
              </View>
            </View>
            <View style={styles.cardAbsensi}>
              <Image source={IlDefault} style={styles.profileImage} />
              <View>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '700'},
                  ]}>
                  Djafar Siddiq Assegaf
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Pukul: 07.00 WITA
                </Text>
                <Text
                  style={[
                    styles.username,
                    {color: COLORS.black, fontWeight: '400', fontSize: 16},
                  ]}>
                  Hadir
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const StatCard = ({icon, label}) => (
  <View style={styles.statCard}>
    {icon}
    <Text style={styles.statNumber}>0</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderWidth: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  headerContent: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: '700',
  },
  headerTitleAccent: {
    color: '#cca457',
  },
  welcomeSection: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  profileImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    color: COLORS.white,
    fontSize: 20,
  },
  gradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  statsContainer: {
    borderColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  statCard: {
    width: 81,
    height: 78,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  dateSection: {
    marginTop: 30,
    alignItems: 'center',
    gap: 5,
    flexDirection: 'row',
  },
  dateText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
  textWhiteBold: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  buttonCheck: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 30,
    padding: 2,
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  cardAbsensi: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
  },
  contentCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default HomeScreen;
