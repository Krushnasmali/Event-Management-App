// LoginScreen.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';
import CustomModal from '../components/CustomModal';

const DEMO_CREDENTIALS = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'test@test.com', password: 'test123' },
  { email: 'demo@demo.com', password: 'demo123' },
];

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  const showModal = (
    title,
    message,
    buttons = [{ text: 'OK', onPress: () => setModalVisible(false) }]
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalButtons(buttons);
    setModalVisible(true);
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      showModal('Validation', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const isValid = DEMO_CREDENTIALS.some(
        cred => cred.email === email && cred.password === password
      );

      if (isValid) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      } else {
        showModal(
          'Login Failed',
          'Invalid email or password.\n\nDemo credentials:\nuser@example.com / password123\ntest@test.com / test123\ndemo@demo.com / demo123'
        );
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090017" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0B061A', '#1A0B3D', '#2A0E6F']}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Glass Card */}
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoWrap}>
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                style={styles.logoCircle}
              >
                <Icon name="calendar-heart" size={36} color="#fff" />
              </LinearGradient>
              <Text style={styles.appName}>Evento</Text>
              <Text style={styles.subtitle}>
                Welcome back, sign in to continue
              </Text>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputBox}>
                <Icon name="email-outline" size={20} color="#AAA" />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#766CA6"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputBox}>
                <Icon name="lock-outline" size={20} color="#AAA" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#766CA6"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#AAA"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Demo info */}
            <View style={styles.demoBox}>
              <Icon name="information-outline" size={18} color="#8B5CF6" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.demoTitle}>Demo login</Text>
                <Text style={styles.demoText}>
                  user@example.com / password123
                </Text>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginBtn,
                { opacity: isLoading ? 0.7 : 1 },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginText}>
                {isLoading ? 'Signing in…' : 'Continue'}
              </Text>
              <Icon name="arrow-right" size={20} color="#090017" />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Social */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Icon name="google" size={20} color="#fff" />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Icon name="apple" size={20} color="#fff" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Register */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>New to Evento?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.register}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        buttons={modalButtons}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050012',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BORDER_RADIUS.xl || 24,
    padding: SPACING.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  logoWrap: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },

  appName: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: '#fff',
  },

  subtitle: {
    marginTop: 4,
    fontSize: FONT_SIZE.sm,
    color: '#AAA',
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: SPACING.lg,
  },

  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: '#DDD',
    marginBottom: 6,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  forgot: {
    color: '#8B5CF6',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A0F3A',
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },

  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },

  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139,92,246,0.15)',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },

  demoTitle: {
    color: '#fff',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },

  demoText: {
    color: '#DDD',
    fontSize: FONT_SIZE.sm,
  },

  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B783FF',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },

  loginText: {
    color: '#090017',
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  dividerText: {
    marginHorizontal: SPACING.md,
    color: '#AAA',
    fontSize: FONT_SIZE.sm,
  },

  socialRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },

  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    gap: SPACING.sm,
  },

  socialText: {
    color: '#fff',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  footerText: {
    color: '#AAA',
    fontSize: FONT_SIZE.sm,
  },

  register: {
    marginLeft: 6,
    color: '#8B5CF6',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
});
