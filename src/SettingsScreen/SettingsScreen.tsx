import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../BottomNav/BottomNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './SettingsScreenStyles';

const SettingsScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{12,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return false;
    }
    if (!passwordRegex.test(currentPassword)) {
      Alert.alert('Erreur', 'Le mot de passe actuel doit contenir au moins 12 caractères.');
      return false;
    }
    if (!passwordRegex.test(newPassword)) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 12 caractères.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    Alert.alert('Succès', 'Paramètres mis à jour (simulation frontend).');
    setEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </Pressable>
        <Text style={styles.title}>Paramètres</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouvel email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe actuel"
            placeholderTextColor="#A0A0A0"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            placeholderTextColor="#A0A0A0"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le nouveau mot de passe"
            placeholderTextColor="#A0A0A0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </Pressable>
        </View>
      </View>
      <BottomNav activeScreen="Settings" />
      <BurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
};

export default SettingsScreen;