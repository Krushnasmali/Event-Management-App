import auth from '@react-native-firebase/auth';

/**
 * Firebase Authentication Service
 * Centralized auth logic for login, register, logout
 */

/**
 * Register with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise} user credentials
 */
export const registerWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
      message: 'Registration successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise} user credentials
 */
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

/**
 * Logout current user
 * @returns {Promise}
 */
export const logout = async () => {
  try {
    await auth().signOut();
    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

/**
 * Get current authenticated user
 * @returns {Promise} current user or null
 */
export const getCurrentUser = () => {
  return auth().currentUser;
};

/**
 * Subscribe to authentication state changes
 * @param {function} callback - called with user object or null
 * @returns {function} unsubscribe function
 */
export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged((user) => {
    callback(user);
  });
};

/**
 * Get user's ID token
 * @returns {Promise} token string
 */
export const getUserIdToken = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
};

/**
 * Send password reset email
 * @param {string} email
 * @returns {Promise}
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

/**
 * Update user profile
 * @param {object} updates - {displayName, photoURL}
 * @returns {Promise}
 */
export const updateUserProfile = async (updates) => {
  try {
    const user = auth().currentUser;
    if (user) {
      await user.updateProfile(updates);
      return {
        success: true,
        message: 'Profile updated successfully',
      };
    }
    return {
      success: false,
      message: 'No user logged in',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

/**
 * Convert Firebase error codes to user-friendly messages
 * @param {string} code - Firebase error code
 * @returns {string} user-friendly error message
 */
export const getErrorMessage = (code) => {
  const errorMessages = {
    'auth/email-already-in-use': 'Email is already in use. Please use a different email.',
    'auth/invalid-email': 'Invalid email address. Please check and try again.',
    'auth/operation-not-allowed': 'Email/Password login is not enabled. Please try another method.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email. Please register first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/too-many-requests':
      'Too many failed login attempts. Please try again later.',
    'auth/network-request-failed':
      'Network error. Please check your internet connection.',
    'auth/account-exists-with-different-credential':
      'This email is associated with another account.',
    'auth/invalid-credential': 'Invalid credentials. Please try again.',
    'auth/credential-already-in-use':
      'These credentials are already in use by another account.',
  };

  return errorMessages[code] || code || 'An error occurred. Please try again.';
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isUserAuthenticated = () => {
  return auth().currentUser !== null;
};

/**
 * Verify email (send verification email)
 * @returns {Promise}
 */
export const sendEmailVerification = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await user.sendEmailVerification();
      return {
        success: true,
        message: 'Verification email sent',
      };
    }
    return {
      success: false,
      message: 'No user logged in',
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code),
    };
  }
};

export default {
  registerWithEmailPassword,
  loginWithEmailPassword,
  logout,
  getCurrentUser,
  onAuthStateChanged,
  getUserIdToken,
  sendPasswordResetEmail,
  updateUserProfile,
  getErrorMessage,
  isUserAuthenticated,
  sendEmailVerification,
};
