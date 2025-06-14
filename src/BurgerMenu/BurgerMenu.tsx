import React from 'react';
import { View, Text, Pressable, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './BurgerMenuStyles';

type BurgerMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
    onClose();
  };

  const handleTasksPress = () => {
    navigation.navigate('Tasks');
    onClose();
  };

  const handleContactPress = () => {
    navigation.navigate('Contact');
    onClose();
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
    onClose();
  };

  const handleLogoutPress = () => {
    Alert.alert('Déconnexion', 'Déconnexion simulée (frontend uniquement).');
    navigation.navigate('Login');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handleHomePress}>
            <Text style={styles.menuIcon}>🏠</Text>
            <Text style={styles.menuText}>Home</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handleTasksPress}>
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuText}>Tâches</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handleContactPress}>
            <Text style={styles.menuIcon}>✉️</Text>
            <Text style={styles.menuText}>Contact</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handleSettingsPress}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Paramètres</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={handleLogoutPress}>
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={styles.menuText}>Déconnexion</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default BurgerMenu;