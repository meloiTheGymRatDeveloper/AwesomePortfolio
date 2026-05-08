import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../../constants/theme';

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wala pang workout ngayon. Magsimula na tayo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center', padding: 24 },
  text: { color: colors.text.secondary, fontSize: typography.base, textAlign: 'center' },
});
