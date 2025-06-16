import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import BottomNav from '../BottomNav/BottomNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './TaskScreenStyles';

const API_URL = 'http://10.0.2.2:3000';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskScreen: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les tâches');
    }
  };

  const handleAddTask = async () => {
    if (!taskTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la tâche.');
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        { title: taskTitle.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setTaskTitle('');
      Alert.alert('Succès', 'Tâche ajoutée');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’ajouter la tâche');
    }
  };

  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => (t.id === id ? response.data : t)));
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la tâche');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
      Alert.alert('Succès', 'Tâche supprimée');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer la tâche');
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editedTitle.trim()) {
      Alert.alert('Erreur', 'Le titre de la tâche ne peut pas être vide.');
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${id}`,
        { title: editedTitle.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      setEditingTaskId(null);
      setEditedTitle('');
      Alert.alert('Succès', 'Tâche modifiée');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de modifier la tâche');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle('');
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      {editingTaskId === item.id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Modifier la tâche"
            placeholderTextColor="#A0A0A0"
          />
          <Pressable
            style={styles.saveButton}
            onPress={() => handleSaveEdit(item.id)}
          >
            <Text style={styles.saveButtonText}>✔</Text>
          </Pressable>
          <Pressable
            style={styles.cancelButton}
            onPress={handleCancelEdit}
          >
            <Text style={styles.cancelButtonText}>✖</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={styles.checkbox}
            onPress={() => handleToggleComplete(item.id)}
          >
            <Text style={styles.checkboxText}>
              {item.completed ? '✔' : ''}
            </Text>
          </Pressable>
          <Text
            style={[
              styles.taskText,
              item.completed && styles.taskTextCompleted,
            ]}
          >
            {item.title}
          </Text>
          <Pressable
            style={styles.editButton}
            onPress={() => handleStartEdit(item)}
          >
            <Text style={styles.editButtonText}>🖌️</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteTask(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </Pressable>
        </>
      )}
    </View>
  );

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
        <Text style={styles.title}>Mes Tâches</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nouvelle tâche"
            placeholderTextColor="#A0A0A0"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <Pressable style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </Pressable>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={item => item.id.toString()}
          style={styles.taskList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Aucune tâche pour le moment.</Text>
          }
        />
      </View>
      <BottomNav activeScreen="Tasks" />
      <BurgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
};

export default TaskScreen;