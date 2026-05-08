import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../../constants/theme';

export default function CoachScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coach Mayari 🌙</Text>
      <Text style={styles.sub}>AI Coach — Week 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.brand.primary, fontSize: typography.xl, fontWeight: 'bold' },
  sub: { color: colors.text.muted, fontSize: typography.sm, marginTop: 8 },
});
