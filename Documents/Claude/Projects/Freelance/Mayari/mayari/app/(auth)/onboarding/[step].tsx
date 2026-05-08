import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography } from '../../../constants/theme';

export default function OnboardingStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Step {step} — Week 1 placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary, alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.text.primary, fontSize: typography.base },
});
