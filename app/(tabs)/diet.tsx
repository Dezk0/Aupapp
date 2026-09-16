import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const mockDiets = [
  {
    id: '1',
    childName: 'Sofía García',
    assignedDate: '20 Apr 2026',
    doctor: 'Dr. Martínez',
    meals: [
      { type: 'Desayuno', description: 'Avena con frutas y leche descremada', done: true },
      { type: 'Colación AM', description: 'Manzana y nueces', done: true },
      { type: 'Comida', description: 'Arroz, pollo a la plancha y verduras al vapor', done: false },
      { type: 'Colación PM', description: 'Yogur natural sin azúcar', done: false },
      { type: 'Cena', description: 'Sopa de verduras y pan integral', done: false },
    ],
  },
  {
    id: '2',
    childName: 'Mateo García',
    assignedDate: '18 Apr 2026',
    doctor: 'Dr. Martínez',
    meals: [
      { type: 'Desayuno', description: 'Huevos revueltos con tostadas integrales', done: true },
      { type: 'Colación AM', description: 'Plátano', done: false },
      { type: 'Comida', description: 'Pasta con atún y ensalada verde', done: false },
      { type: 'Colación PM', description: 'Zanahoria con hummus', done: false },
      { type: 'Cena', description: 'Crema de brócoli y tortilla', done: false },
    ],
  },
];

function SkeletonBlock() {
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
    <Animated.View style={[styles.skeletonBlock, { opacity: anim }]}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLineShort} />
    </Animated.View>
  );
}

export default function DietScreen() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('1');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const diet = mockDiets.find(d => d.id === selected);
  const completed = diet ? diet.meals.filter(m => m.done).length : 0;
  const total = diet ? diet.meals.length : 0;
  const progress = total > 0 ? completed / total : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dietas asignadas</Text>
        <Text style={styles.headerSub}>Revisa el plan de cada niño</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            <SkeletonBlock />
            <SkeletonBlock />
          </>
        ) : (
          <>
            {/* Selector de niño */}
            <View style={styles.selectorRow}>
              {mockDiets.map(d => (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.selectorBtn, selected === d.id && styles.selectorBtnActive]}
                  onPress={() => setSelected(d.id)}
                >
                  <Text style={[styles.selectorText, selected === d.id && styles.selectorTextActive]}>
                    {d.childName.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {diet && (
              <>
                {/* Info card */}
                <View style={styles.infoCard}>
                  <Text style={styles.infoDoctor}>👨‍⚕️ {diet.doctor}</Text>
                  <Text style={styles.infoDate}>Asignada el {diet.assignedDate}</Text>

                  {/* Progress bar */}
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>{completed}/{total} comidas completadas</Text>
                    <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` as any }]} />
                  </View>
                </View>

                {/* Meals */}
                <Text style={styles.sectionTitle}>Plan del día</Text>
                {diet.meals.map((meal, i) => (
                  <View key={i} style={[styles.mealCard, meal.done && styles.mealCardDone]}>
                    <View style={[styles.mealCheck, meal.done && styles.mealCheckDone]}>
                      <Text style={styles.mealCheckText}>{meal.done ? '✓' : ''}</Text>
                    </View>
                    <View style={styles.mealInfo}>
                      <Text style={[styles.mealType, meal.done && styles.mealTypeDone]}>
                        {meal.type}
                      </Text>
                      <Text style={styles.mealDesc}>{meal.description}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}
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
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4, fontWeight: '600' },
  body: { padding: 24, paddingBottom: 40 },
  selectorRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  selectorBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#fff', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#d4e8e8',
  },
  selectorBtnActive: { backgroundColor: '#2C7A7B', borderColor: '#2C7A7B' },
  selectorText: { fontSize: 14, fontWeight: '700', color: '#6B9E9E' },
  selectorTextActive: { color: '#fff' },
  infoCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    marginBottom: 20, shadowColor: '#2C7A7B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8,
  },
  infoDoctor: { fontSize: 14, fontWeight: '700', color: '#1A3A3A', marginBottom: 2 },
  infoDate: { fontSize: 12, color: '#6B9E9E', fontWeight: '600', marginBottom: 14 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 12, color: '#6B9E9E', fontWeight: '600' },
  progressPct: { fontSize: 12, color: '#2C7A7B', fontWeight: '800' },
  progressTrack: {
    height: 8, backgroundColor: '#E1F5EE', borderRadius: 4, overflow: 'hidden',
  },
  progressBar: { height: 8, backgroundColor: '#2C7A7B', borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A3A3A', marginBottom: 14 },
  mealCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    shadowColor: '#2C7A7B', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6,
  },
  mealCardDone: { backgroundColor: '#F0FAF6' },
  mealCheck: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, borderColor: '#d4e8e8',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  mealCheckDone: { backgroundColor: '#2C7A7B', borderColor: '#2C7A7B' },
  mealCheckText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  mealInfo: { flex: 1 },
  mealType: { fontSize: 13, fontWeight: '800', color: '#1A3A3A', marginBottom: 2 },
  mealTypeDone: { color: '#2C7A7B' },
  mealDesc: { fontSize: 12, color: '#6B9E9E', fontWeight: '600' },
  skeletonBlock: {
    backgroundColor: '#d4e8e8', borderRadius: 16, padding: 16, marginBottom: 14,
  },
  skeletonTitle: { height: 16, backgroundColor: '#b0cece', borderRadius: 8, width: '50%', marginBottom: 12 },
  skeletonLine: { height: 12, backgroundColor: '#b0cece', borderRadius: 6, marginBottom: 8 },
  skeletonLineShort: { height: 12, backgroundColor: '#b0cece', borderRadius: 6, width: '65%' },
});