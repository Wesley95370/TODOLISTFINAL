import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './BottomoNavStyles';

type BottomNavProps = {
  activeScreen: string;
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleTasksPress = () => {
    navigation.navigate('Tasks');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleContactPress = () => {
    navigation.navigate('Contact');
  };

  const handleLogoutPress = () => {
    Alert.alert('Déconnexion', 'Déconnexion simulée (frontend uniquement).');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navContainer}>
      <Pressable
        style={[
          styles.navButton,
          activeScreen === 'Home' && styles.navButtonActive,
        ]}
        onPress={handleHomePress}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navText}>Home</Text>
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeScreen === 'Tasks' && styles.navButtonActive,
        ]}
        onPress={handleTasksPress}
      >
        <Text style={styles.navIcon}>📋</Text>
        <Text style={styles.navText}>Tâches</Text>
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeScreen === 'Contact' && styles.navButtonActive,
        ]}
        onPress={handleContactPress}
      >
        <Text style={styles.navIcon}>✉️</Text>
        <Text style={styles.navText}>Contact</Text>
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeScreen === 'Settings' && styles.navButtonActive,
        ]}
        onPress={handleSettingsPress}
      >
        <Text style={styles.navIcon}>⚙️</Text>
        <Text style={styles.navText}>Paramètres</Text>
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeScreen === 'Logout' && styles.navButtonActive,
        ]}
        onPress={handleLogoutPress}
      >
        <Text style={styles.navIcon}>🚪</Text>
        <Text style={styles.navText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
};

export default BottomNav;