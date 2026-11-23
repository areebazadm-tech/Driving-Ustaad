import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { C, emailValid, phoneValid, strongPassword } from './src/theme';
import { WelcomeScreen, SignupScreen, DetailsScreen, VerificationScreen, ExpiredScreen, LoginScreen, BiometricScreen, LockedScreen } from './src/AuthScreens';
import { DemoTabScreen, ProfileScreen } from './src/AppScreens';

// HACKATHON FRONTEND DEMO ONLY.
// Account data, passwords, OTP, and lockout state are in memory; no backend exists.
// Never use this implementation as production authentication.
const DEMO_EMAIL = 'demo@drivingustaad.app';
const DEMO_PASSWORD = 'Demo123!';
const DEMO_OTP = '482416';
const OTP_TTL_MS = 2 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

function DrivingUstaadApp() {
  const [screen, setScreen] = useState('Welcome');
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', password: '', confirm: '', agreed: false });
  const [account, setAccount] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [profileDetails, setProfileDetails] = useState({ name: 'Ali Ahmed', email: DEMO_EMAIL, mobile: '+92 300 1234567', licence: '', emergencyContact: '', language: 'English', learningLevel: 'Beginner' });
  const [otp, setOtp] = useState('');
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [loginEmail, setLoginEmail] = useState(DEMO_EMAIL);
  const [loginPassword, setLoginPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [failedLogins, setFailedLogins] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = (until) => Math.max(0, Math.ceil((until - now) / 1000));
  const otpRemaining = remaining(otpExpiresAt);
  const resendRemaining = remaining(resendAt);
  const lockRemaining = remaining(lockedUntil);

  const go = (next) => { setHistory((h) => [...h, screen]); setScreen(next); };
  const back = () => {
    if (history.length === 0) return setScreen('Welcome');
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setScreen(last);
  };
  const changeTab = (tab) => { setHistory([]); setScreen(tab); };
  const update = (changes) => setForm((previous) => ({ ...previous, ...changes }));

  const validateAccount = () => {
    if (!form.fullName.trim() || !emailValid(form.email) || !phoneValid(form.mobile) || !strongPassword(form.password) || form.confirm !== form.password || !form.agreed) {
      Alert.alert('Check your details', 'Complete the fields, use a strong matching password and accept the terms.');
      return false;
    }
    return true;
  };

  const beginVerification = () => {
    if (!validateAccount()) return;
    setOtp('');
    const currentTime = Date.now();
    setOtpExpiresAt(currentTime + OTP_TTL_MS);
    setResendAt(currentTime + 30000);
    go('Verify');
  };

  const resend = () => {
    // No SMS/email is actually sent. The same public demo code is used.
    setOtp('');
    const currentTime = Date.now();
    setOtpExpiresAt(currentTime + OTP_TTL_MS);
    setResendAt(currentTime + 30000);
    go('Verify');
    Alert.alert('Demo code ready', `Enter ${DEMO_OTP}. Email/SMS delivery will be integrated with a real backend.`);
  };

  const verify = () => {
    if (otpRemaining <= 0) return go('Expired');
    if (otp !== DEMO_OTP) return Alert.alert('Incorrect code', `For this demo, the verification code is ${DEMO_OTP}.`);
    setAccount({ fullName: form.fullName, email: form.email, mobile: form.mobile, password: form.password, verified: true });
    setAuthenticated(true);
    setProfileDetails((p) => ({ ...p, name: form.fullName, email: form.email, mobile: form.mobile }));
    setHistory([]);
    setScreen('Profile');
    Alert.alert('Account verified', 'Your demo account is ready.');
  };

  useEffect(() => {
    if (screen === 'Verify' && otpExpiresAt && otpRemaining === 0) {
      setScreen('Expired');
    }
  }, [screen, otpExpiresAt, otpRemaining]);

  const login = () => {
    if (lockedUntil > Date.now()) return go('Locked');
    const email = loginEmail.trim().toLowerCase();
    const demoValid = email === DEMO_EMAIL && loginPassword === DEMO_PASSWORD;
    const registeredValid = account?.verified && account.email.trim().toLowerCase() === email && account.password === loginPassword;
    if (demoValid || registeredValid) {
      setProfileDetails((p) => ({ ...p, name: registeredValid ? account.fullName : 'Ali Ahmed', email: registeredValid ? account.email : DEMO_EMAIL, mobile: registeredValid ? account.mobile : '+92 300 1234567' }));
      setFailedLogins(0);
      setAuthenticated(true);
      setHistory([]);
      setScreen('Profile');
      return;
    }
    const attempts = failedLogins + 1;
    setFailedLogins(attempts);
    if (attempts >= 5) {
      setLockedUntil(Date.now() + LOCK_MS);
      setHistory([]);
      setScreen('Locked');
    } else Alert.alert('Incorrect login', `Please check your demo credentials. ${5 - attempts} attempts left.`);
  };

  const biometric = async () => {
    try {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hardware || !enrolled) {
        Alert.alert('Biometrics unavailable', 'Enable fingerprint or face unlock on a physical device, then try again.');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Unlock Driving Ustaad demo', fallbackLabel: 'Use device passcode' });
      if (!result.success) return Alert.alert('Not authenticated', 'Please try your device biometrics again.');
      // Deliberately do not start a server session based on biometric success.
      // This local-only demo navigates to the profile screen for presentation.
      setAuthenticated(true);
      setHistory([]);
      setScreen('Profile');
    } catch (error) { Alert.alert('Biometrics error', String(error?.message || error)); }
  };

  const signOut = () => {
    setAuthenticated(false);
    setLoginPassword('');
    setHistory([]);
    setScreen('Login');
  };

  let content;
  switch (screen) {
    case 'Welcome': content = <WelcomeScreen go={go}/>; break;
    case 'Signup': content = <SignupScreen form={form} update={update} go={go} back={back} onStartValidation={() => go('Details')}/>; break;
    case 'Details': content = <DetailsScreen form={form} update={update} back={back} onContinue={beginVerification}/>; break;
    case 'Verify': content = <VerificationScreen email={form.email} otp={otp} setOtp={setOtp} remaining={otpRemaining} resendRemaining={resendRemaining} onResend={() => { if (resendRemaining <= 0) resend(); }} onVerify={verify} back={back} showExpired={() => go('Expired')}/>; break;
    case 'Expired': content = <ExpiredScreen onResend={resend} onBack={() => { setHistory([]); setScreen('Signup'); }}/>; break;
    case 'Login': content = <LoginScreen email={loginEmail} setEmail={setLoginEmail} password={loginPassword} setPassword={setLoginPassword} remember={remember} setRemember={setRemember} onLogin={login} go={go} back={() => setScreen('Welcome')}/>; break;
    case 'Biometric': content = <BiometricScreen onAuthenticate={biometric} onPassword={() => setScreen('Login')} back={back}/>; break;
    case 'Locked': content = <LockedScreen remaining={lockRemaining} back={() => setScreen('Login')} goHelp={() => Alert.alert('Account help', 'In production, support and recovery are handled by the authentication service.')}/>; break;
    case 'Profile': content = <ProfileScreen profile={profileDetails} updateProfile={(key, value) => setProfileDetails((p) => ({ ...p, [key]: value }))} onTab={changeTab} onSignOut={signOut}/>; break;
    default: content = <DemoTabScreen tab={screen} onTab={changeTab} onSignOut={signOut}/>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'bottom']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF"/>
        <View style={{ flex: 1, alignSelf: 'center', width: '100%', maxWidth: 430, backgroundColor: '#FFF' }}>{content}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });
  if (!fontsLoaded && !fontError) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}><ActivityIndicator color={C.orange} size="large"/></View>;
  return <DrivingUstaadApp/>;
}
