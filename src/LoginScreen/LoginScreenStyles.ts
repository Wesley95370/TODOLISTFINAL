import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Blanc PSG
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#003087', // Bleu PSG
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003087', // Bleu PSG
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#DA291C', // Rouge PSG
  },
  loginButton: {
    backgroundColor: '#DA291C', // Rouge PSG
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Blanc PSG
    fontSize: 18,
    fontWeight: 'bold',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  toggleButtonText: {
    fontSize: 18,
    color: '#003087',
  },
});