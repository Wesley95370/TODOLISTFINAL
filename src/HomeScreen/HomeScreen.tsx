import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleTasksPress = () => {
    navigation.navigate('Tasks');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>To Do List</Text>
        <Text style={styles.slogan}>Organise ta vie, accomplis tes rêves !</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
          <Pressable style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.buttonText}>Inscription</Text>
          </Pressable>
          <Pressable style={styles.taskButton} onPress={handleTasksPress}>
            <Text style={styles.taskButtonText}>Mes Tâches</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;