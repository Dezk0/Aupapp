import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const mockChildren = [
  { id: '1', name: 'Sofía García', age: 5, weight: '18 kg', height: '108 cm' },
  { id: '2', name: 'Mateo García', age: 8, weight: '25 kg', height: '128 cm' },
];

function SkeletonCard() {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.skeletonCard, { opacity: anim }]}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonInfo}>
        <View style={styles.skeletonLine} />
        <View style={styles.skeletonLineShort} />
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, Juan! 👋</Text>
          <Text style={styles.subgreeting}>Estos son tus niños registrados</Text>
        </View>
        <TouchableOpacity style={styles.avatarBtn}>
          <Text style={styles.avatarText}>J</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Mis niños</Text>
            {mockChildren.map(child => (
              <TouchableOpacity
                key={child.id}
                style={styles.card}
                onPress={() => router.push(`/children/${child.id}`)}
              >
                <View style={styles.cardAvatar}>
                  <Text style={styles.cardAvatarText}>{child.name.charAt(0)}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{child.name}</Text>
                  <Text style={styles.cardDetail}>{child.age} años · {child.weight} · {child.height}</Text>
                </View>
                <Text style={styles.cardArrow}>›</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => router.push('/children/register')}
            >
              <Text style={styles.addBtnText}>+ Agregar niño</Text>
            </TouchableOpacity>
          </>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: 22, fontWeight: '800', color: '#fff' },
  subgreeting: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4, fontWeight: '600' },
  avatarBtn: {
    width: 42, height: 42, backgroundColor: '#F6AE2D',
    borderRadius: 21, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#1A3A3A' },
  body: { padding: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A3A3A', marginBottom: 14 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    shadowColor: '#2C7A7B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  cardAvatar: {
    width: 46, height: 46, backgroundColor: '#E1F5EE',
    borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  cardAvatarText: { fontSize: 20, fontWeight: '800', color: '#2C7A7B' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: '#1A3A3A' },
  cardDetail: { fontSize: 12, color: '#6B9E9E', marginTop: 3, fontWeight: '600' },
  cardArrow: { fontSize: 24, color: '#6B9E9E' },
  addBtn: {
    backgroundColor: '#2C7A7B', borderRadius: 14, padding: 15,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#2C7A7B', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10,
  },
  addBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  skeletonCard: {
    backgroundColor: '#d4e8e8', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12, height: 78,
  },
  skeletonAvatar: { width: 46, height: 46, backgroundColor: '#b0cece', borderRadius: 23, marginRight: 14 },
  skeletonInfo: { flex: 1, gap: 8 },
  skeletonLine: { height: 14, backgroundColor: '#b0cece', borderRadius: 7, width: '70%' },
  skeletonLineShort: { height: 11, backgroundColor: '#b0cece', borderRadius: 6, width: '45%' },
});