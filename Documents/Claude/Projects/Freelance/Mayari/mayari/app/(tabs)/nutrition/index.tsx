import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../../constants/theme';

export default function NutritionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Almusal / Tanghalian / Merienda / Hapunan</Text>
      <Text style={styles.sub}>Nutrition — Week 3 placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.text.secondary, fontSize: typography.base },
  sub: { color: colors.text.muted, fontSize: typography.sm, marginTop: 8 },
});
