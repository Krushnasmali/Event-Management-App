// firebaseAuth.js
// Centralized Firebase Authentication Service

import auth from '@react-native-firebase/auth';

/**
 * Initialize Firebase Auth (already initialized by Firebase SDK)
 * This file provides a clean interface for all auth operations
 */

const firebaseAuth = {
  /**
   * Get current auth instance
   */
  getAuth: () => auth(),

  /**
   * Get current user
   */
  getCurrentUser: () => auth().currentUser,

  /**
   * Sign up with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} displayName - User's full name
   * @returns {Promise<Object>} User credentials
   */
  signUp: async (email, password, displayName) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update user profile with display name
      await userCredential.user.updateProfile({
        displayName: displayName,
      });

      return {
        success: true,
        user: userCredential.user,
        message: 'Account created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: firebaseAuth.formatError(error),
      };
    }
  },

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User credentials
   */
  signIn: async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return {
        success: true,
        user: userCredential.user,
        message: 'Logged in successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: firebaseAuth.formatError(error),
      };
    }
  },

  /**
   * Sign out current user
   * @returns {Promise<Object>} Result of sign out
   */
  signOut: async () => {
    try {
      await auth().signOut();
      return {
        success: true,
        message: 'Signed out successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: firebaseAuth.formatError(error),
      };
    }
  },

  /**
   * Listen to auth state changes
   * @param {Function} callback - Function to call when auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthStateChanged: (callback) => {
    return auth().onAuthStateChanged((user) => {
      callback(user);
    });
  },

  /**
   * Format Firebase error messages to be user-friendly
   * @param {Object} error - Firebase error object
   * @returns {string} Formatted error message
   */
  formatError: (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This user account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email';
      case 'auth/weak-password':
        return 'Password is too weak (minimum 6 characters)';
      case 'auth/operation-not-allowed':
        return 'Email/password authentication is not enabled';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later';
      default:
        return errorMessage || 'An error occurred. Please try again';
    }
  },

  /**
   * Get user's display name
   * @returns {string|null} User's display name or null
   */
  getUserName: () => {
    const user = auth().currentUser;
    return user ? user.displayName : null;
  },

  /**
   * Get user's email
   * @returns {string|null} User's email or null
   */
  getUserEmail: () => {
    const user = auth().currentUser;
    return user ? user.email : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated: () => {
    return auth().currentUser !== null;
  },

  /**
   * Get user's UID
   * @returns {string|null} User's unique ID or null
   */
  getUserUID: () => {
    const user = auth().currentUser;
    return user ? user.uid : null;
  },
};

export default firebaseAuth;
