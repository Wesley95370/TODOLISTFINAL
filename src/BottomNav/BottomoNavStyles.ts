import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#003087', // Bleu PSG
    paddingVertical: 8, // Réduit pour compacter
    borderTopWidth: 2,
    borderTopColor: '#DA291C', // Rouge PSG
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 6, // Réduit pour compacter
    paddingHorizontal: 10, // Réduit pour plus d'espace
    borderRadius: 12,
  },
  navButtonActive: {
    backgroundColor: '#DA291C', // Rouge PSG
  },
  navIcon: {
    fontSize: 20, // Réduit de 24 à 20 pour mieux s'adapter
    color: '#FFFFFF', // Blanc
  },
  navText: {
    fontSize: 10, // Réduit de 12 à 10 pour compacter
    fontWeight: '600',
    color: '#FFFFFF', // Blanc
  },
});

export default styles;