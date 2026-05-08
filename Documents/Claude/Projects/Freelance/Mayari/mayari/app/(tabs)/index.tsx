import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Kumusta! 💪</Text>
      <Text style={styles.sub}>Home — Week 1 placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
  greeting: { color: colors.brand.secondary, fontSize: typography.xl, fontWeight: 'bold' },
  sub: { color: colors.text.secondary, fontSize: typography.sm, marginTop: 8 },
});
