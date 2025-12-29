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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';
import CustomModal from '../components/CustomModal';

const RegisterScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
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

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showModal = (title, message, buttons = [{ text: 'OK', onPress: () => setModalVisible(false) }]) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalButtons(buttons);
    setModalVisible(true);
  };

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
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
    }, 500);
  };

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const styles = createStyles(colors, isDarkMode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Top accent bubble */}
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
                Create your account to get started
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formSection}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Full name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: colors.border, backgroundColor: colors.surface },
                  ]}
                >
                  <Icon
                    name="account-outline"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.textLight}
                    value={fullName}
                    onChangeText={setFullName}
                    editable={!isLoading}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Email */}
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

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
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
                    placeholder="Create a password"
                    placeholderTextColor={colors.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                    returnKeyType="next"
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

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm password</Text>
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
                    placeholder="Re-enter your password"
                    placeholderTextColor={colors.textLight}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    editable={!isLoading}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon
                      name={showConfirmPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms text */}
              <View style={styles.termsRow}>
                <Icon
                  name="shield-check-outline"
                  size={18}
                  color={colors.textSecondary}
                  style={{ marginRight: SPACING.xs }}
                />
                <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                  By signing up, you agree to our{' '}
                  <Text style={[styles.termsLink, { color: colors.primary }]}>
                    Terms & Privacy
                  </Text>
                  .
                </Text>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                {
                  backgroundColor: colors.primary,
                  opacity: isLoading ? 0.7 : 1,
                },
              ]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={[styles.registerButtonText, { color: colors.background }]}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Text>
              <Icon name="arrow-right" size={20} color={colors.background} />
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.footerSection}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleLoginPress} disabled={isLoading}>
                <Text style={[styles.loginLink, { color: colors.primary }]}>Log in</Text>
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
      right: -60,
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
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: SPACING.sm,
    },
    termsText: {
      flex: 1,
      fontSize: FONT_SIZE.xs || 12,
      lineHeight: 18,
    },
    termsLink: {
      fontWeight: FONT_WEIGHT.semibold,
    },
    registerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      marginBottom: SPACING.lg,
      gap: SPACING.sm,
    },
    registerButtonText: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
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
    loginLink: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default RegisterScreen;
