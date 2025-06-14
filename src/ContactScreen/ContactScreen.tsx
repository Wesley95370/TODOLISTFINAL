import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../BottomNav/BottomNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './ContactScreenStyles';

const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const messageRegex = /^.{10,}$/;

    if (!nameRegex.test(name)) {
      Alert.alert('Erreur', 'Veuillez entrer un nom valide (au moins 2 caractères, lettres seulement).');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return false;
    }
    if (!messageRegex.test(message)) {
      Alert.alert('Erreur', 'Le message doit contenir au moins 10 caractères.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    Alert.alert('Succès', 'Message envoyé (simulation frontend).');
    setName('');
    setEmail('');
    setMessage('');
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
        <Text style={styles.title}>Contact</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Votre nom"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Votre message"
            placeholderTextColor="#A0A0A0"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </Pressable>
        </View>
      </View>
      <BottomNav activeScreen="Contact" />
      <BurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
};

export default ContactScreen;