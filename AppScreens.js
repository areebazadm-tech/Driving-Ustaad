import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionLink, AppButton, BottomTabs, Heading, IconCard, Note, Screen, SectionLabel, Txt } from './ui';
import { C, FONT } from './theme';

const TAB_COPY = {
  Home: { title: 'Ready for the road?', subtitle: 'Your driving journey begins here.', icon: 'car-sport-outline' },
  Learn: { title: 'Driving lessons', subtitle: 'Browse structured beginner-friendly lessons.', icon: 'book-outline' },
  Explore: { title: 'Discover & practice', subtitle: 'Road signs, quizzes and driving tips.', icon: 'compass-outline' },
  Progress: { title: 'Your progress', subtitle: 'Keep track of every milestone.', icon: 'stats-chart-outline' },
};

export function DemoTabScreen({ tab, onTab, onSignOut }) {
  const copy = TAB_COPY[tab] || TAB_COPY.Home;
  return (
    <Screen header={tab} onBack={() => onTab('Profile')} footer={<BottomTabs current={tab} onSelect={onTab}/>}>
      <View style={{ paddingTop: 26 }}>
        <SectionLabel>DRIVING USTAAD</SectionLabel>
        <View style={{ backgroundColor: C.pale, alignItems: 'center', padding: 36, borderRadius: 23, marginBottom: 20 }}>
          <Ionicons name={copy.icon} size={79} color={C.orange}/>
        </View>
        <Heading>{copy.title}</Heading>
        <Txt color={C.muted} style={{ marginTop: 9, marginBottom: 18 }}>{copy.subtitle}</Txt>
        <Note icon="construct-outline">This tab is the next development milestone. The F-1 registration, login and profile demo is ready to explore.</Note>
        <AppButton label="View my profile" icon="person-outline" onPress={() => onTab('Profile')}/>
        <AppButton label="Sign out" secondary onPress={onSignOut}/>
      </View>
    </Screen>
  );
}

export function ProfileScreen({ profile, updateProfile, onTab, onSignOut }) {
  const [panel, setPanel] = useState('');
  const update = updateProfile;
  const cards = [
    { title: 'Personal Information', subtitle: 'Name, avatar and contact', icon: 'person-outline', panel: 'Personal Information' },
    { title: 'Learner Licence', subtitle: 'View your licence information', icon: 'reader-outline', panel: 'Learner Licence' },
    { title: 'Emergency Contact', subtitle: profile.emergencyContact || 'Add an emergency contact', icon: 'call-outline', panel: 'Emergency Contact' },
    { title: 'Learning Preferences', subtitle: 'Language, level and pace', icon: 'settings-outline', panel: 'Learning Preferences' },
  ];
  const fields = {
    'Personal Information': [['name', 'Full name'], ['email', 'Email address'], ['mobile', 'Mobile number']],
    'Learner Licence': [['licence', 'Licence number (optional)']],
    'Emergency Contact': [['emergencyContact', 'Phone number']],
    'Learning Preferences': [['language', 'Language'], ['learningLevel', 'Learning level']],
  };
  return (
    <>
      <Screen header="My Profile" onBack={() => onTab('Home')} footer={<BottomTabs current="Profile" onSelect={onTab}/>}>
        <View style={{ alignItems: 'center', paddingTop: 14 }}>
          <Pressable onPress={() => setPanel('Personal Information')} style={{ height: 90, width: 90, borderRadius: 45, borderWidth: 3, borderColor: C.border, backgroundColor: C.paleBlue, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="person-outline" color={C.navy} size={44}/>
          </Pressable>
          <Heading size={24} style={{ marginTop: 11 }}>{profile.name}</Heading>
          <Txt size={11} color={C.muted} style={{ marginTop: 3 }}>Learner · Driving Ustaad</Txt>
        </View>
        <View style={{ borderRadius: 16, padding: 15, borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 17 }}>
          <View style={{ height: 85, width: 85, borderRadius: 43, borderWidth: 10, borderColor: C.orange, borderTopColor: '#E6EDF5', alignItems: 'center', justifyContent: 'center' }}>
            <Txt weight="extrabold" size={19}>80%</Txt><Txt size={9} color={C.muted}>Complete</Txt>
          </View>
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Txt weight="bold" size={13}>Profile completion</Txt>
            <Txt color={C.muted} size={10} style={{ marginVertical: 6 }}>4 of 5 profile sections completed</Txt>
            <View style={{ backgroundColor: C.border, height: 6, borderRadius: 5, overflow: 'hidden' }}><View style={{ width: '80%', height: '100%', backgroundColor: C.orange }}/></View>
          </View>
        </View>
        {cards.map((c) => <IconCard key={c.title} title={c.title} subtitle={c.subtitle} icon={c.icon} onPress={() => setPanel(c.panel)} />)}
        <Note icon="lock-closed-outline">Only your signed-in account should be able to access this information.</Note>
        <AppButton label="Sign out" secondary onPress={onSignOut} style={{ marginTop: 8 }}/>
      </Screen>
      <Modal transparent visible={!!panel} animationType="slide" onRequestClose={() => setPanel('')}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(7,26,55,0.4)' }}>
          <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22, paddingBottom: 35 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <Heading size={20}>{panel}</Heading>
              <Pressable onPress={() => setPanel('')} accessibilityLabel="Close modal"><Ionicons name="close-circle-outline" color={C.navy} size={29}/></Pressable>
            </View>
            {fields[panel]?.map(([key, label]) => (
              <View key={key} style={{ marginBottom: 13 }}>
                <Txt size={11} weight="bold" style={{ marginBottom: 6 }}>{label}</Txt>
                <TextInput style={{ borderWidth: 1, borderColor: C.border, borderRadius: 13, paddingVertical: 11, paddingHorizontal: 12, fontFamily: FONT.regular, color: C.navy }} value={profile[key]} onChangeText={(v) => update(key, v)}/>
              </View>
            ))}
            <Note>Profile edits are stored in memory in this frontend-only starter, not on a server.</Note>
            <AppButton label="Save changes" icon="checkmark" onPress={() => setPanel('')}/>
          </View>
        </View>
      </Modal>
    </>
  );
}
