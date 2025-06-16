import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003087', // Bleu PSG
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  menuButton: {
    backgroundColor: '#FFFFFF', // Blanc
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#DA291C', // Rouge PSG
  },
  menuButtonText: {
    fontSize: 20,
    color: '#003087', // Bleu PSG
  },
  content: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanc
    textAlign: 'center',
    textShadowColor: '#DA291C', // Rouge PSG
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    backgroundColor: '#FFFFFF', // Blanc
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 16,
    color: '#003087', // Bleu PSG
    borderWidth: 2,
    borderColor: '#DA291C', // Rouge PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#DA291C', // Rouge PSG
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // Blanc
  },
  backButton: {
    backgroundColor: '#FFFFFF', // Blanc
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#DA291C', // Rouge PSG
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
    color: '#003087', // Bleu PSG
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

export default styles;