import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BottomNav from '../BottomNav/BottomNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { AuthContext } from '../contexts/AuthContext';
import styles from './ContactScreenStyles';

const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { API_URL } = useContext(AuthContext);

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const messageRegex = /^[\s\S]{10,}$/;

    const cleanedMessage = message.trim().replace(/\n+/g, ' ');
    console.log('Validation du message:', {
      original: message,
      cleaned: cleanedMessage,
      originalLength: message.length,
      cleanedLength: cleanedMessage.length,
      raw: JSON.stringify(message),
    });

    if (!nameRegex.test(name)) {
      Alert.alert('Erreur', 'Veuillez entrer un nom valide (lettres seulement, un seul espace entre mots).');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return false;
    }
    if (!messageRegex.test(cleanedMessage)) {
      Alert.alert('Erreur', `Le message doit contenir au moins 10 caractères (actuel: ${cleanedMessage.length})`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const cleanedMessage = message.trim().replace(/\n+/g, ' ');
    console.log('Soumission du formulaire:', {
      name,
      email,
      message: cleanedMessage,
      messageLength: cleanedMessage.length,
    });

    if (!name || !email || !cleanedMessage) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/contact`, { name, email, message: cleanedMessage });
      console.log('Réponse backend:', response.data);
      Alert.alert('Succès', response.data.message || 'Message envoyé avec succès');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      console.error('Erreur lors de l’envoi du message:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      Alert.alert('Erreur', error.response?.data?.error || 'Échec de l’envoi du message');
    }
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