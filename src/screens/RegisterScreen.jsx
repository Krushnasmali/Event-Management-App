// RegisterScreen.jsx

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

const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      showModal('Validation', 'Please fill all fields');
      return;
    }
    if (!validateEmail(email)) {
      showModal('Validation', 'Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      showModal('Validation', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      showModal('Validation', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      showModal('Success', `Account created for ${fullName}!`, [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainApp' }],
            });
          },
        },
      ]);
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
            {/* Header */}
            <View style={styles.header}>
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                style={styles.logo}
              >
                <Icon name="calendar-heart" size={34} color="#fff" />
              </LinearGradient>

              <Text style={styles.appName}>Evento</Text>
              <Text style={styles.subtitle}>
                Create your account to get started
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full name</Text>
              <View style={styles.inputBox}>
                <Icon name="account-outline" size={20} color="#AAA" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#766CA6"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

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
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBox}>
                <Icon name="lock-outline" size={20} color="#AAA" />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm password</Text>
              <View style={styles.inputBox}>
                <Icon name="lock-outline" size={20} color="#AAA" />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#766CA6"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#AAA"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms */}
            <View style={styles.termsRow}>
              <Icon name="shield-check-outline" size={18} color="#AAA" />
              <Text style={styles.termsText}>
                By signing up, you agree to our{' '}
                <Text style={styles.termsLink}>Terms & Privacy</Text>.
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.registerBtn,
                { opacity: isLoading ? 0.7 : 1 },
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.registerText}>
                {isLoading ? 'Creating account…' : 'Create account'}
              </Text>
              <Icon name="arrow-right" size={20} color="#090017" />
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginLink}>Log in</Text>
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

export default RegisterScreen;

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

  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },

  logo: {
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

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
  },

  termsText: {
    flex: 1,
    marginLeft: 6,
    fontSize: FONT_SIZE.xs,
    color: '#AAA',
    lineHeight: 18,
  },

  termsLink: {
    color: '#8B5CF6',
    fontWeight: FONT_WEIGHT.semibold,
  },

  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B783FF',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },

  registerText: {
    color: '#090017',
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    color: '#AAA',
    fontSize: FONT_SIZE.sm,
  },

  loginLink: {
    marginLeft: 6,
    color: '#8B5CF6',
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
});
