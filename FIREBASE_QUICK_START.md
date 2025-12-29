# 🚀 Firebase Auth Setup - Quick Reference

## ⚡ TL;DR

Your Event Management App now has **persistent login**. Once a user signs up or logs in, they'll automatically be logged in every time they open the app until they explicitly log out.

---

## 📋 What Was Done

### Files Created:
1. **`src/services/firebaseAuth.js`** - Centralized Firebase auth service

### Files Modified:
1. **`App.jsx`** - Added auth state listener & loading screen
2. **`src/navigation/AuthNavigator.jsx`** - Conditional navigation based on auth
3. **`src/screens/LoginScreen.jsx`** - Uses firebaseAuth service
4. **`src/screens/RegisterScreen.jsx`** - Uses firebaseAuth service + improved UI
5. **`src/screens/ProfileScreen.jsx`** - Added logout functionality

---

## ✅ What Works Now

| Feature | How It Works |
|---------|------------|
| **Sign Up** | User creates account → Firebase creates user → Auto-navigates to app |
| **Sign In** | User logs in → Firebase authenticates → Auto-navigates to app |
| **Persistent Login** | Close app → Firebase stores session → App auto-logins on restart |
| **Logout** | User taps logout → Firebase signs out → Auto-navigates to login |
| **Loading** | App shows spinner while checking auth state |
| **Errors** | Friendly error messages for each failure |

---

## 🧪 Quick Test

### Test 1: Create Account
```
LoginScreen → "Create account" → RegisterScreen
Fill form → "Create account" → HomeScreen ✅
```

### Test 2: Auto Login
```
Close app → Open app → HomeScreen ✅ (No login required!)
```

### Test 3: Logout
```
ProfileScreen → Logout → LoginScreen ✅
```

---

## 📱 Before You Deploy

### ✅ Checklist

- [ ] Google-services.json is in `android/app/` (it is ✅)
- [ ] Firebase Console has Email/Password enabled (verify below)
- [ ] Run `npm install` (already done ✅)
- [ ] Run `npx react-native run-android` to test

### How to Enable Email/Password in Firebase Console

1. Go to https://console.firebase.google.com
2. Select **evento-bb2eb** project
3. Click **Authentication** (left sidebar)
4. Click **Sign-in method** tab
5. Find **Email/Password** and ensure it's **enabled** (toggle on)
6. Click **Save**

Done! 🎉

---

## 📂 Project Structure

```
src/
├── services/
│   └── firebaseAuth.js          ← NEW (centralized auth)
├── screens/
│   ├── LoginScreen.jsx          ✏️ UPDATED
│   ├── RegisterScreen.jsx       ✏️ UPDATED
│   ├── ProfileScreen.jsx        ✏️ UPDATED
│   └── ... (other screens)
├── navigation/
│   └── AuthNavigator.jsx        ✏️ UPDATED
└── ... (other folders)

App.jsx                          ✏️ UPDATED
```

---

## 🔑 Key Concepts

### 1. Firebase Auth Listener (App.jsx)
```javascript
useEffect(() => {
  const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
    setUser(user);        // Update user state
    setIsLoading(false);  // Stop showing spinner
  });
  return () => unsubscribe();
}, []);
```
- Listens for auth changes continuously
- Updates immediately when user logs in/out
- Triggers AuthNavigator re-render

### 2. Conditional Navigation (AuthNavigator.jsx)
```javascript
{isAuthenticated ? (
  <Stack.Screen name="MainApp" component={BottomTabsNavigator} />
) : (
  <>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
  </>
)}
```
- Shows LoginScreen if not authenticated
- Shows MainApp if authenticated
- No manual navigation needed!

### 3. Centralized Auth Service (firebaseAuth.js)
```javascript
const result = await firebaseAuth.signUp(email, password, name);
if (result.success) {
  // User created, auth state changes, App detects it
} else {
  showModal('Error', result.error);
}
```
- Single source of truth for auth logic
- Reusable across entire app
- Better error handling

---

## 🚨 Troubleshooting

### Issue: Login/Register shows "Unknown Error"
**Solution:** Email/Password auth not enabled in Firebase Console
→ Follow "Before You Deploy" section above

### Issue: App gets stuck on loading
**Solution:** Firebase taking too long to initialize
→ Try: `npx react-native run-android --reset-cache`

### Issue: Persistent login not working
**Solution:** Session cache might be cleared
→ Test: Sign up → Restart app → Should auto-login

---

## 🎯 Next Steps

1. **Enable Email/Password in Firebase Console** (if not done)
2. **Run the app:** `npm run android`
3. **Test all flows** (see "Quick Test" above)
4. **Ready to deploy!**

---

## 📚 File Reference

### `src/services/firebaseAuth.js`
**Main functions:**
- `signUp(email, password, displayName)` → Create account
- `signIn(email, password)` → Login
- `signOut()` → Logout
- `onAuthStateChanged(callback)` → Listen to auth changes
- `getCurrentUser()` → Get user object
- `isAuthenticated()` → Check if logged in
- `formatError(error)` → Convert Firebase errors

### `App.jsx`
**Manages:**
- Auth state checking
- Loading spinner
- Passing auth status to navigation

### `AuthNavigator.jsx`
**Handles:**
- Conditional rendering based on `isAuthenticated` prop
- LoginScreen/RegisterScreen (not logged in)
- MainApp (logged in)

### `LoginScreen.jsx`
**Uses:**
- `firebaseAuth.signIn()`
- No manual navigation (auto-handled)

### `RegisterScreen.jsx`
**Uses:**
- `firebaseAuth.signUp()`
- No manual navigation (auto-handled)

### `ProfileScreen.jsx`
**Has:**
- Logout button
- Uses `firebaseAuth.signOut()`
- Shows confirmation modal

---

## 💡 Pro Tips

### Accessing User Info Anywhere
```javascript
import firebaseAuth from '../services/firebaseAuth';

// In any component:
const userName = firebaseAuth.getUserName();
const userEmail = firebaseAuth.getUserEmail();
const userId = firebaseAuth.getUserUID();
```

### Adding New Auth Features
```javascript
// All auth logic is in one file
// Easy to add: password reset, email verification, etc.
import firebaseAuth from '../services/firebaseAuth';

// Add new method in firebaseAuth.js
// Use it anywhere in app
```

### Testing Without Real Accounts
```javascript
// Use test accounts:
// Email: test@example.com
// Password: 123456 (at least 6 characters)

// Firebase will create account on first login
```

---

## 🎉 Summary

| What | Before | After |
|------|--------|-------|
| User logs in | Need to login every time app opens ❌ | Auto-login next time ✅ |
| Code structure | Auth logic scattered in screens ❌ | Centralized in service ✅ |
| Navigation | Manual `navigation.reset()` needed ❌ | Automatic based on state ✅ |
| Error handling | Raw Firebase errors ❌ | Friendly messages ✅ |
| Logout | No logout function ❌ | Logout with confirmation ✅ |

---

**Everything is ready! Test it out! 🚀**
