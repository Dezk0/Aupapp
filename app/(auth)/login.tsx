import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>*</Text>
            </View>
            <Text style={styles.logoText}>Aú<Text style={styles.accent}>pa</Text></Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
          <Text style={styles.subtitle}>Ingresa tus datos para continuar</Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tucorreo@email.com"
            placeholderTextColor="#b0c8c8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#b0c8c8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>

        
          </View>
        

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F7F7',
  },
  header: {
    backgroundColor: '#1A5E5F',
    paddingTop: 60,
    paddingBottom: 36,
    paddingHorizontal: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  accent: { color: '#F6AE2D' },
  form: {
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A3A3A',
    marginBottom: 4,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B9E9E',
    marginBottom: 24,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B9E9E',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#d4e8e8',
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: '#1A3A3A',
    marginBottom: 14,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 12,
    color: '#2C7A7B',
    fontWeight: '700',
  },
  btnPrimary: {
    backgroundColor: '#2C7A7B',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#2C7A7B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 13,
    color: '#6B9E9E',
    fontWeight: '600',
  },
  registerLink: {
    fontSize: 13,
    color: '#2C7A7B',
    fontWeight: '800',
  },
});