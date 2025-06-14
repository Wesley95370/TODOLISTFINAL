import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003087', // Bleu PSG
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanc
    textAlign: 'center',
    textShadowColor: '#DA291C', // Rouge PSG pour ombre
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  loginButton: {
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
  registerButton: {
    backgroundColor: '#FFFFFF', // Blanc
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DA291C', // Bordure rouge PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  taskButton: {
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
    color: '#003087', // Bleu PSG pour texte
  },
  taskButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // Blanc pour contraste sur fond rouge
  },
});

export default styles;