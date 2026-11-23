import React, { useRef, useState } from 'react';
import { Alert, Image, Pressable, TextInput, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActionLink, AppButton, Field, Heading, Logo, Note, Pill, Screen, SectionLabel, Txt } from './ui';
import { C, FONT, emailValid, phoneValid, secondsLabel, strongPassword } from './theme';

export function WelcomeScreen({ go }) {
  return (
    <Screen contentStyle={{ paddingTop: 20 }}>
      <View style={{ alignItems: 'center' }}><Logo style={{ height: 151, width: 245 }} /></View>
      <View style={{ backgroundColor: C.pale, height: 178, overflow: 'hidden', borderRadius: 20, marginTop: 8, justifyContent: 'center' }}>
        <Image source={require('../assets/welcome-road.png')} resizeMode="stretch" style={{ width: '100%', height: '100%' }}/>
      </View>
      <Heading style={{ marginTop: 22 }} size={26}>Learn. Practice. Pass.</Heading>
      <Txt color={C.muted} style={{ marginTop: 6, marginBottom: 20 }}>Your complete guide to safe and confident driving.</Txt>
      <AppButton label="Get Started" icon="arrow-forward-outline" onPress={() => go('Signup')}/>
      <AppButton label="Log In" secondary onPress={() => go('Login')}/>
      <View style={{ backgroundColor: C.pale, borderRadius: 13, padding: 14, marginTop: 7 }}>
        <Txt size={12} weight="bold">Start your journey</Txt>
        <Txt size={11} color={C.muted} style={{ marginTop: 4 }}>Structured lessons, quizzes and instructors in one place.</Txt>
      </View>
    </Screen>
  );
}

export function SignupScreen({ form, update, go, back, onStartValidation }) {
  const [method, setMethod] = useState('Email');
  const fillDemo = () => update({ fullName: 'Ali Ahmed', email: 'ali.ahmed@gmail.com', mobile: '+92 300 1234567', password: 'Learning@123', confirm: 'Learning@123', agreed: true });
  return (
    <Screen header="Create Account" onBack={back} contentStyle={{ paddingTop: 22 }}>
      <SectionLabel>REGISTER WITH EMAIL OR MOBILE</SectionLabel>
      <View style={{ flexDirection: 'row', gap: 6, backgroundColor: C.pale, padding: 4, borderRadius: 12, marginBottom: 18 }}>
        {['Email', 'Mobile', 'Google'].map((label) => <Pill key={label} label={label} active={method === label} onPress={() => { setMethod(label); if (label === 'Google') Alert.alert('Coming next', 'Google sign-in requires OAuth integration and is not enabled in this UI demo.'); }} />)}
      </View>
      <Field label="Full name" icon="person-outline" value={form.fullName} onChangeText={(t) => update({ fullName: t })} placeholder="Your full name" autoCapitalize="words" />
      <Field label="Email address" icon="mail-outline" value={form.email} onChangeText={(t) => update({ email: t })} keyboardType="email-address" placeholder="you@example.com" />
      <Field label="Mobile number" icon="call-outline" value={form.mobile} onChangeText={(t) => update({ mobile: t })} keyboardType="phone-pad" placeholder="+92 300 1234567" />
      <Field label="Password" icon="lock-closed-outline" value={form.password} onChangeText={(t) => update({ password: t })} secure placeholder="At least 8 characters" />
      <Field label="Confirm password" icon="lock-closed-outline" value={form.confirm} onChangeText={(t) => update({ confirm: t })} secure placeholder="Repeat your password" />
      <Pressable onPress={() => update({ agreed: !form.agreed })} style={{ borderRadius: 12, borderWidth: 1, borderColor: C.border, minHeight: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginBottom: 12 }}>
        <Ionicons name={form.agreed ? 'checkbox-outline' : 'square-outline'} size={19} color={form.agreed ? C.green : C.muted}/>
        <Txt size={11} style={{ marginLeft: 8, flex: 1 }}>I agree to Terms & Privacy Policy</Txt>
      </Pressable>
      <AppButton label="Create Account" icon="chevron-forward" onPress={onStartValidation}/>
      <Txt size={17} weight="extrabold" style={{ marginTop: 4, marginBottom: 10 }}>Or register with</Txt>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {['Google', 'Apple', 'Facebook'].map((provider) => <Pressable key={provider} onPress={() => Alert.alert('Not connected', `${provider} login requires provider configuration and backend support.`)} style={{ backgroundColor: C.pale, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8 }}><Txt size={10} weight="bold">{provider}</Txt></Pressable>)}
      </View>
      <ActionLink onPress={fillDemo}>Fill sample details for the demo</ActionLink>
    </Screen>
  );
}

export function DetailsScreen({ form, update, back, onContinue }) {
  const validEmail = emailValid(form.email);
  const validPhone = phoneValid(form.mobile);
  const validPass = strongPassword(form.password);
  const strength = [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^a-zA-Z\d]/.test(form.password)].filter(Boolean).length * 25;
  return (
    <Screen header="Check Your Details" onBack={back} contentStyle={{ paddingTop: 24 }}>
      <SectionLabel>INSTANT VALIDATION</SectionLabel>
      <Field label="Full name" icon="person-outline" value={form.fullName} onChangeText={(t) => update({ fullName: t })} error={!form.fullName.trim() ? 'Enter your name.' : undefined} autoCapitalize="words" />
      <Field label="Email address" icon="mail-outline" value={form.email} onChangeText={(t) => update({ email: t })} error={!validEmail ? 'Please enter a valid email address.' : undefined} keyboardType="email-address" />
      {!validEmail && <Note kind="error">Example: ali@gmail.com</Note>}
      <Field label="Mobile number" icon="call-outline" value={form.mobile} onChangeText={(t) => update({ mobile: t })} keyboardType="phone-pad" error={!validPhone ? 'Enter a valid phone number.' : undefined} />
      {validPhone && <Note kind="success" icon="checkmark-circle-outline">Mobile number format is valid (availability not yet checked).</Note>}
      <Field label="Password" icon="lock-closed-outline" value={form.password} onChangeText={(t) => update({ password: t })} secure />
      <Txt size={11} color={C.muted}>Password strength <Txt weight="bold">{strength}%</Txt></Txt>
      <View style={{ width: '100%', height: 6, backgroundColor: C.border, borderRadius: 5, overflow: 'hidden', marginVertical: 7 }}><View style={{ backgroundColor: C.orange, width: `${strength}%`, height: '100%' }}/></View>
      <View style={{ backgroundColor: C.pale, borderRadius: 12, padding: 14, marginVertical: 7 }}>
        {['At least 8 characters', 'Uppercase letter', 'Number', 'Special character'].map((rule, i) => {
          const passed = [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^a-zA-Z\d]/.test(form.password)][i];
          return <Txt key={rule} size={11} color={passed ? C.green : C.muted}>{passed ? '✓' : '○'} {rule}</Txt>;
        })}
      </View>
      <Field label="Confirm password" icon="lock-closed-outline" value={form.confirm} onChangeText={(t) => update({ confirm: t })} secure error={form.password !== form.confirm ? 'Passwords must match.' : undefined}/>
      <Note icon="shield-checkmark-outline">Passwords must be hashed and protected by a real backend before production.</Note>
      {!form.agreed && <Note kind="error">Please accept the Terms & Privacy Policy on the previous screen.</Note>}
      <AppButton label="Continue" icon="chevron-forward" onPress={onContinue} />
    </Screen>
  );
}

export function VerificationScreen({ email, otp, setOtp, remaining, resendRemaining, onResend, onVerify, back, showExpired }) {
  const inputRef = useRef(null);
  return (
    <Screen header="Verify Your Account" onBack={back} contentStyle={{ paddingTop: 21 }}>
      <View style={{ height: 143, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FBFCFE', borderRadius: 18, marginBottom: 18 }}>
        <Ionicons name="mail-open-outline" size={67} color={C.orange}/>
      </View>
      <Heading>Enter your 6-digit code</Heading>
      <Txt color={C.muted} style={{ marginVertical: 7 }}>We sent a verification code to {email}</Txt>
      <Pressable onPress={() => inputRef.current?.focus()} style={{ flexDirection: 'row', gap: 6, marginTop: 12, marginBottom: 8 }}>
        {Array.from({ length: 6 }, (_, i) => <View key={i} style={{ flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 10, height: 51, alignItems: 'center', justifyContent: 'center' }}><Txt size={21} weight="bold">{otp[i] || ' '}</Txt></View>)}
        <TextInput ref={inputRef} autoFocus value={otp} onChangeText={(v) => setOtp(v.replace(/\D/g, '').slice(0, 6))} keyboardType="number-pad" maxLength={6} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.01 }} accessibilityLabel="Six digit verification code" />
      </Pressable>
      <Note>Code expires in <Txt weight="bold" color={C.orange}>{secondsLabel(remaining)}</Txt>. Resend available in {secondsLabel(resendRemaining)}.</Note>
      <Note icon="lock-closed-outline">Login stays blocked until verification is complete.</Note>
      <AppButton label="Verify Account" icon="checkmark" onPress={onVerify}/>
      <AppButton label="Resend code" secondary onPress={onResend} disabled={resendRemaining > 0}/>
      <ActionLink onPress={() => Alert.alert('Demo OTP', 'For this frontend demonstration, enter 482416. Real delivery is not yet implemented.')}>Show demo verification code</ActionLink>
      <ActionLink onPress={showExpired}>Preview expired-code screen</ActionLink>
    </Screen>
  );
}

export function ExpiredScreen({ onResend, onBack }) {
  return (
    <Screen header="Verification Required" onBack={onBack} contentStyle={{ paddingTop: 20 }}>
      <View style={{ height: 154, justifyContent: 'center', alignItems: 'center', marginBottom: 14, backgroundColor: '#FBFCFE', borderRadius: 18 }}>
        <Ionicons name="warning-outline" size={65} color={C.red}/>
      </View>
      <Heading style={{ textAlign: 'center' }}>The code has expired</Heading>
      <Txt color={C.muted} align="center" style={{ marginVertical: 10 }}>For your protection, the 6-digit code is only valid for a short time.</Txt>
      <Note kind="error">Verification not complete. Request a fresh code to activate your demo account.</Note>
      <AppButton label="Send a New Code" icon="mail-outline" onPress={onResend}/>
      <AppButton label="Back to sign up" secondary onPress={onBack}/>
    </Screen>
  );
}

export function LoginScreen({ email, setEmail, password, setPassword, remember, setRemember, onLogin, go, back }) {
  return (
    <Screen header="Log In" onBack={back} contentStyle={{ paddingTop: 0 }}>
      <Logo style={{ height: 150, width: 232 }}/>
      <Heading>Welcome back!</Heading>
      <Txt color={C.muted} style={{ marginTop: 5, marginBottom: 19 }}>Continue your driving journey.</Txt>
      <Field label="Email or mobile" icon="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Email address"/>
      <Field label="Password" icon="lock-closed-outline" value={password} onChangeText={setPassword} secure placeholder="Password"/>
      <Pressable onPress={() => setRemember(!remember)} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.border, borderRadius: 13, padding: 13, marginBottom: 6 }}>
        <Ionicons name={remember ? 'checkmark-circle-outline' : 'ellipse-outline'} color={remember ? C.green : C.muted} size={18}/>
        <Txt style={{ marginLeft: 8 }} size={12}>Remember me for 30 days</Txt>
      </Pressable>
      <Note>Demo only: this option does not currently persist a login session.</Note>
      <AppButton label="Log In" icon="arrow-forward-outline" onPress={onLogin}/>
      <AppButton label="Log in with Face ID / Fingerprint" icon="shield-checkmark-outline" secondary onPress={() => go('Biometric')}/>
      <ActionLink onPress={() => Alert.alert('Forgot password', 'Password reset via email is planned. Use the demo credentials in README.md for now.')}>Forgot password?</ActionLink>
      <ActionLink onPress={() => go('Signup')}>New here? Create an account</ActionLink>
    </Screen>
  );
}

export function BiometricScreen({ onAuthenticate, onPassword, back }) {
  const [remember, setRemember] = useState(true);
  return (
    <Screen header="Biometric Login" onBack={back} contentStyle={{ paddingTop: 24 }}>
      <View style={{ height: 163, backgroundColor: '#FBFCFE', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 19 }}>
        <MaterialCommunityIcons name="shield-check-outline" size={74} color={C.orange}/>
      </View>
      <Heading>Sign in with Face ID</Heading>
      <Txt color={C.muted} style={{ marginTop: 8, marginBottom: 12 }}>Use the biometrics already enabled on your phone.</Txt>
      <Note>For this prototype, local device authentication is a UI demonstration, not a replacement for a verified backend session.</Note>
      <Pressable onPress={() => setRemember(!remember)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="checkmark-circle-outline" size={18} color={C.navy}/>
          <View><Txt size={12} weight="bold">Remember this device</Txt><Txt size={10} color={C.muted}>For a future secure login session</Txt></View>
        </View>
        <Ionicons name={remember ? 'toggle' : 'toggle-outline'} size={34} color={C.navy}/>
      </Pressable>
      <AppButton label="Use Face ID / Fingerprint" icon="checkmark" onPress={onAuthenticate}/>
      <AppButton label="Use password instead" secondary onPress={onPassword}/>
    </Screen>
  );
}

export function LockedScreen({ remaining, goHelp, back }) {
  return (
    <Screen header="Account Temporarily Locked" onBack={back} contentStyle={{ paddingTop: 24 }}>
      <View style={{ height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: 10, backgroundColor: '#FBFCFE', borderRadius: 18 }}>
        <Ionicons name="lock-closed-outline" size={64} color={C.red}/>
      </View>
      <Heading>Too many failed attempts</Heading>
      <Txt color={C.muted} style={{ marginTop: 8, marginBottom: 15 }}>Five consecutive unsuccessful demo logins triggered a temporary lock.</Txt>
      <View style={{ backgroundColor: C.pale, borderRadius: 14, alignItems: 'center', padding: 21, marginBottom: 10 }}>
        <Txt size={10} weight="medium">TRY AGAIN IN</Txt>
        <Txt color={C.orange} size={34} weight="extrabold" style={{ marginVertical: 7 }}>{secondsLabel(remaining)}</Txt>
        <Txt color={C.muted} size={11}>15 minute security lockout (local demo)</Txt>
      </View>
      <AppButton label="Log In" disabled={remaining > 0} onPress={back}/>
      <AppButton label="Get Help" secondary icon="help-circle-outline" onPress={goHelp}/>
    </Screen>
  );
}
