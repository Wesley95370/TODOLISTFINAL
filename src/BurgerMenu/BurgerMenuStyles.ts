import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: '70%',
    height: '100%',
    backgroundColor: '#003087', // Bleu PSG
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#DA291C', // Rouge PSG
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#FFFFFF', // Blanc
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#DA291C', // Rouge PSG
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#003087', // Bleu PSG
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // Blanc
    borderWidth: 2,
    borderColor: '#DA291C', // Rouge PSG
  },
  menuIcon: {
    fontSize: 20,
    color: '#003087', // Bleu PSG
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087', // Bleu PSG
  },
});

export default styles;