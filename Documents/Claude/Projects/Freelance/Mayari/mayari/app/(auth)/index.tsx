import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌙 Mayari</Text>
      <Text style={styles.sub}>Your Filipino fitness companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.brand.secondary,
    fontSize: typography['3xl'],
    fontWeight: 'bold',
  },
  sub: {
    color: colors.text.secondary,
    fontSize: typography.base,
    marginTop: 8,
  },
});
