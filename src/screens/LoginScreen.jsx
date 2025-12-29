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
  const { colors, isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  const showModal = (title, message, buttons = [{ text: 'OK', onPress: () => setModalVisible(false) }]) => {
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
    }, 500);
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const styles = createStyles(colors, isDarkMode);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Gradient-ish top decoration */}
      <View style={styles.topAccent} />

      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card */}
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerSection}>
              <View style={styles.logoWrapper}>
                <View style={[styles.logoCircleOuter, { borderColor: colors.primary }]}>
                  <View style={[styles.logoCircleInner, { backgroundColor: colors.primary }]}>
                    <Icon name="calendar-heart" size={40} color={colors.background} />
                  </View>
                </View>
              </View>

              <Text style={[styles.appName, { color: colors.text }]}>Evento</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Welcome back, sign in to continue
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formSection}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: colors.border, backgroundColor: colors.surface },
                  ]}
                >
                  <Icon
                    name="email-outline"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="name@example.com"
                    placeholderTextColor={colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={[styles.forgotText, { color: colors.primary }]}>
                      Forgot?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: colors.border, backgroundColor: colors.surface },
                  ]}
                >
                  <Icon
                    name="lock-outline"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Demo Credentials */}
              <View style={[styles.demoInfo, { backgroundColor: colors.surfaceAlt || colors.surface }]}>
                <Icon name="information-outline" size={18} color={colors.info || colors.primary} />
                <View style={styles.demoTextWrapper}>
                  <Text style={[styles.demoTitle, { color: colors.text }]}>Demo login</Text>
                  <Text style={[styles.demoText, { color: colors.textSecondary }]}>
                    user@example.com / password123
                  </Text>
                </View>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: colors.primary,
                  opacity: isLoading ? 0.7 : 1,
                },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={[styles.loginButtonText, { color: colors.background }]}>
                {isLoading ? 'Signing you in...' : 'Continue'}
              </Text>
              <Icon name="arrow-right" size={20} color={colors.background} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            </View>

            {/* Social buttons (placeholder) */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: colors.border }]}
                activeOpacity={0.8}
              >
                <Icon name="google" size={20} color={colors.text} />
                <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: colors.border }]}
                activeOpacity={0.8}
              >
                <Icon name="apple" size={20} color={colors.text} />
                <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.footerSection}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                New to Evento?{' '}
              </Text>
              <TouchableOpacity onPress={handleRegisterPress} disabled={isLoading}>
                <Text style={[styles.registerLink, { color: colors.primary }]}>
                  Create account
                </Text>
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

const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    wrapper: {
      flex: 1,
    },
    topAccent: {
      position: 'absolute',
      top: -140,
      left: -60,
      width: 260,
      height: 260,
      borderRadius: 260,
      backgroundColor: isDarkMode ? colors.primaryDark || colors.primary : colors.primary,
      opacity: 0.12,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xxl,
      justifyContent: 'center',
    },
    card: {
      borderRadius: BORDER_RADIUS.xl || 24,
      padding: SPACING.xxl,
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.18,
      shadowRadius: 20,
      elevation: 8,
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    logoWrapper: {
      marginBottom: SPACING.lg,
    },
    logoCircleOuter: {
      width: 84,
      height: 84,
      borderRadius: 42,
      borderWidth: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoCircleInner: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appName: {
      fontSize: FONT_SIZE.xxxl,
      fontWeight: FONT_WEIGHT.bold,
      letterSpacing: 0.5,
      marginBottom: SPACING.xs,
    },
    subtitle: {
      fontSize: FONT_SIZE.md,
      textAlign: 'center',
      opacity: 0.8,
    },
    formSection: {
      marginBottom: SPACING.xxl,
    },
    inputGroup: {
      marginBottom: SPACING.lg,
    },
    label: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
      marginBottom: SPACING.xs,
    },
    labelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xs,
    },
    forgotText: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: BORDER_RADIUS.lg,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
    },
    inputIcon: {
      marginRight: SPACING.md,
    },
    input: {
      flex: 1,
      fontSize: FONT_SIZE.md,
    },
    demoInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
      marginTop: SPACING.lg,
    },
    demoTextWrapper: {
      marginLeft: SPACING.sm,
    },
    demoTitle: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
      marginBottom: 2,
    },
    demoText: {
      fontSize: FONT_SIZE.sm,
    },
    loginButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      marginBottom: SPACING.lg,
      gap: SPACING.sm,
    },
    loginButtonText: {
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
    },
    dividerText: {
      marginHorizontal: SPACING.md,
      fontSize: FONT_SIZE.sm,
    },
    socialRow: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: SPACING.xl,
    },
    socialButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      gap: SPACING.sm,
    },
    socialText: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
    },
    footerSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: SPACING.sm,
    },
    footerText: {
      fontSize: FONT_SIZE.sm,
    },
    registerLink: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default LoginScreen;
