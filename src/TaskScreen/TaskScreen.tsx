
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../BottomNav/BottomNav';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import styles from './TaskScreenStyles';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskScreen: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la tâche.');
      return;
    }
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskTitle.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    Alert.alert('Succès', 'Tâche ajoutée (simulation frontend).');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    Alert.alert('Succès', 'Tâche supprimée (simulation frontend).');
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = (id: string) => {
    if (!editedTitle.trim()) {
      Alert.alert('Erreur', 'Le titre de la tâche ne peut pas être vide.');
      return;
    }
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title: editedTitle.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditedTitle('');
    Alert.alert('Succès', 'Tâche modifiée (simulation frontend).');
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
          keyExtractor={item => item.id}
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