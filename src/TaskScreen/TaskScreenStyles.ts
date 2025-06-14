import { StyleSheet } from 'react-native';

// Styles for TaskScreen with PSG theme (Blue: #003087, Red: #DA291C, White: #FFFFFF)
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#003087', // Blue PSG
  },

  // Header for burger menu button
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  menuButton: {
    backgroundColor: '#FFFFFF', // White
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#003087', // Blue PSG
  },

  // Main content
  content: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 60, // Space for BottomNav
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // White
    textAlign: 'center',
    textShadowColor: '#DA291C', // Red PSG
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30,
  },

  // Task input section
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 16,
    color: '#003087', // Blue PSG
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#DA291C', // Red PSG
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // White
  },

  // Task list
  taskList: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#DA291C', // Red PSG
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#003087', // Blue PSG
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0', // Grey for completed
  },
  editInput: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#003087', // Blue PSG
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    marginRight: 10,
  },

  // Task action buttons
  editButton: {
    padding: 5,
    marginRight: 5,
  },
  editButtonText: {
    fontSize: 20,
    color: '#003087', // Blue PSG
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#DA291C', // Red PSG
  },
  saveButton: {
    padding: 5,
    marginRight: 5,
  },
  saveButtonText: {
    fontSize: 20,
    color: '#DA291C', // Red PSG
  },
  cancelButton: {
    padding: 5,
  },
  cancelButtonText: {
    fontSize: 20,
    color: '#003087', // Blue PSG
  },

  // Back button
  backButton: {
    backgroundColor: '#FFFFFF', // White
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#DA291C', // Red PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087', // Blue PSG
  },

  // Empty list message
  emptyText: {
    fontSize: 16,
    color: '#FFFFFF', // White
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;