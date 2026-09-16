import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+52 33 1234 5678',
    children: 2,
  };

  const menuItems = [
    { icon: '👤', label: 'Datos personales' },
    { icon: '🔔', label: 'Notificaciones' },
    { icon: '🔒', label: 'Cambiar contraseña' },
    { icon: '❓', label: 'Ayuda y soporte' },
    { icon: '📄', label: 'Términos y privacidad' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>

        {/* Avatar y nombre */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.children}</Text>
              <Text style={styles.statLabel}>Niños</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Doctor</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Semanas</Text>
            </View>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📞</Text>
            <View>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>✉️</Text>
            <View>
              <Text style={styles.infoLabel}>Correo</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <View key={i}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
              {i < menuItems.length - 1 && <View style={styles.menuDivider} />}
            </View>
          ))}
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F7' },
  header: {
    backgroundColor: '#1A5E5F',
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  body: { padding: 24, paddingBottom: 40 },
  profileCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 16,
    shadowColor: '#2C7A7B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  avatar: {
    width: 72, height: 72, backgroundColor: '#2C7A7B',
    borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#fff' },
  userName: { fontSize: 18, fontWeight: '800', color: '#1A3A3A', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#6B9E9E', fontWeight: '600', marginBottom: 20 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { alignItems: 'center', paddingHorizontal: 24 },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#2C7A7B' },
  statLabel: { fontSize: 11, color: '#6B9E9E', fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: '#d4e8e8' },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    marginBottom: 16, shadowColor: '#2C7A7B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  infoIcon: { fontSize: 20 },
  infoLabel: { fontSize: 11, color: '#6B9E9E', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 14, color: '#1A3A3A', fontWeight: '600', marginTop: 2 },
  infoDivider: { height: 1, backgroundColor: '#d4e8e8', marginVertical: 12 },
  menuCard: {
    backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16,
    marginBottom: 16, shadowColor: '#2C7A7B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 12,
  },
  menuIcon: { fontSize: 20, width: 28 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1A3A3A' },
  menuArrow: { fontSize: 22, color: '#6B9E9E' },
  menuDivider: { height: 1, backgroundColor: '#d4e8e8' },
  logoutBtn: {
    backgroundColor: '#fff', borderRadius: 14, padding: 15,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#E05252',
  },
  logoutText: { color: '#E05252', fontSize: 15, fontWeight: '800' },
});