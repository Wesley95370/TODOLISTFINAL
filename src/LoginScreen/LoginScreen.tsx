import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import styles from './LoginScreenStyles';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{12,}$/;

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 12 caractères.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      await login(email.trim(), password.trim());
      Alert.alert('Succès', 'Connexion réussie');
      navigation.navigate('Tasks' as never);
    } catch (error) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Retour</Text>
        </Pressable>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.toggleButtonText}>{showPassword ? '👁️' : '🙈'}</Text>
            </Pressable>
          </View>
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;