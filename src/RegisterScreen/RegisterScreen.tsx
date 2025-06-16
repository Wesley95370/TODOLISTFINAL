import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import styles from './RegisterScreenStyles';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{12,}$/;

  const validateForm = () => {
    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()) {
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
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      await register(firstName.trim(), lastName.trim(), email.trim(), password.trim());
      Alert.alert('Succès', 'Inscription réussie');
      navigation.navigate('Tasks' as never);
    } catch (error: any) {
      const message =
        error.response?.data?.error === 'Email déjà utilisé'
          ? 'Cet email est déjà enregistré.'
          : error.response?.data?.error || 'Échec de l’inscription. Vérifiez vos informations.';
      Alert.alert('Erreur', message);
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
        <Text style={styles.title}>Inscription</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor="#A0A0A0"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#A0A0A0"
            value={lastName}
            onChangeText={setLastName}
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              placeholderTextColor="#A0A0A0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable
              style={styles.toggleButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.toggleButtonText}>{showConfirmPassword ? '👁️' : '🙈'}</Text>
            </Pressable>
          </View>
          <Pressable style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;