# Event Management App - Navigation Quick Reference

## Overview

The app uses React Navigation with a nested navigation structure:
- **AuthNavigator** (Root) - Handles authentication flow
- **BottomTabsNavigator** - Main app with 4 tabs
- **HomeStackNavigator** - Home tab with nested screens
- **ProfileStackNavigator** - Profile tab with nested screens

---

## Complete Navigation Map

### Login Flow
```
App.jsx
  ↓
AuthNavigator
  ├─ LoginScreen (default)
  ├─ RegisterScreen
  └─ MainApp (BottomTabsNavigator after login)
```

### Main App Tabs
```
BottomTabsNavigator (after successful login)
  ├─ HomeTab → HomeStackNavigator
  │   ├─ HomeMain (displays category cards)
  │   ├─ CategoryScreen (vendor list with filters)
  │   └─ VendorDetailScreen (vendor info)
  │
  ├─ BookingsTab → BookingsScreen (empty state)
  │
  ├─ NotificationsTab → NotificationsScreen
  │
  └─ ProfileTab → ProfileStackNavigator
      ├─ ProfileMain (user profile)
      └─ SettingsScreen (settings)
```

---

## HomeScreen Navigation Flows

### 1. Category Card Navigation
```javascript
// User taps category card (e.g., "DJ")
CategoryCard (onPress)
  ↓
HomeScreen.handleCategoryPress(category)
  ↓
navigation.navigate('CategoryScreen', {
  categoryName: 'DJ',
  categoryId: '1',
  categoryColor: '#FF6B6B',
  categoryDescription: 'Professional DJ Services'
})
  ↓
CategoryScreen opens
```

**Categories Available:**
- DJ (#FF6B6B)
- Mandap/Tent (#4ECDC4)
- Catering (#FFE66D)
- Band (#95E1D3)
- Hall (#AA96DA)
- Photography (#FCBAD3)
- Decoration (#A8D8EA)

---

### 2. Notifications Button
```javascript
// User taps bell icon (top right)
HomeScreen Bell Button (onPress)
  ↓
navigation.navigate('NotificationsTab')
  ↓
NotificationsScreen opens
```

---

### 3. Featured Event Card
```javascript
// User taps featured concert card
FeaturedCard (onPress - currently no action)
// Can be extended to navigate to event details
```

---

## CategoryScreen Navigation

```javascript
// After CategoryScreen opens, user can:

1. Filter by Location:
   - Select State → City dropdown updates
   - Select City → Vendor list updates
   
2. Tap Vendor Card:
   VendorCard (onPress)
     ↓
   CategoryScreen.handleVendorPress(vendor)
     ↓
   navigation.navigate('VendorDetailScreen', {
     vendor: vendor_object,
     categoryColor: '#FF6B6B'
   })
     ↓
   VendorDetailScreen opens

3. Back Button:
   BackButton (onPress)
     ↓
   navigation.goBack()
     ↓
   HomeScreen
```

---

## VendorDetailScreen Navigation

```javascript
// VendorDetailScreen displays vendor info with:

1. Back Button → navigation.goBack() → CategoryScreen

2. Contact Options:
   - Call Button → Placeholder (can call vendor)
   - Message Button → Placeholder (can message vendor)

3. Book Now Button → Placeholder (can book vendor)

4. Heart Icon → Placeholder (can save as favorite)
```

---

## ProfileScreen Navigation

```javascript
// Profile Menu Items:

✅ Edit Profile → Placeholder
✅ Saved Services → Placeholder  
✅ Payment Methods → Placeholder
✅ Settings → navigation.navigate('SettingsScreen')
✅ Help & Support → Placeholder
✅ Logout → Placeholder

// From SettingsScreen:
← Back Button → navigation.goBack() → ProfileScreen
```

---

## Image Assets

All images are stored in `src/assets/images/` as local files:

### Category Images:
- `dj.jpg` - Used in DJ category
- `mandap.jpg` - Used in Mandap/Tent category
- `catering.jpg` - Used in Catering category
- `band.jpg` - Used in Band category
- `hall.jpg` - Used in Hall category
- `photography.jpg` - Used in Photography category
- `decoration.jpg` - Used in Decoration category

### Featured Images:
- `featured-concert.jpg` - Featured event on HomeScreen
- `event-placeholder.jpg` - Placeholder for nearby events

### Implementation:
```javascript
// In categoriesData.js
image: require('../assets/images/dj.jpg')

// In vendorsData.js
images: [require('../assets/images/dj.jpg')]

// In screens
<Image source={require('../assets/images/dj.jpg')} />
```

---

## Navigation Hooks & Methods

### Common Navigation Patterns:

```javascript
// Navigate to a screen
navigation.navigate('ScreenName', { param1: value1 })

// Go back to previous screen
navigation.goBack()

// Replace the current screen
navigation.replace('ScreenName')

// Reset navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'ScreenName' }]
})
```

### Get Navigation Params:

```javascript
const { vendor, categoryColor } = route.params
```

---

## Screen Parameters

### HomeStack Navigation Parameters:

**CategoryScreen receives:**
```javascript
{
  categoryName: string,      // e.g., "DJ"
  categoryId: string,        // e.g., "1"
  categoryColor: string,     // e.g., "#FF6B6B"
  categoryDescription: string // e.g., "Professional DJ Services"
}
```

**VendorDetailScreen receives:**
```javascript
{
  vendor: {
    id: string,
    name: string,
    category: string,
    state: string,
    city: string,
    costPerDay: number,
    rating: number,
    availability: boolean,
    description: string,
    images: [require(...)]
  },
  categoryColor: string
}
```

---

## Theme Colors Used

All screens use the `useTheme()` hook to access colors:

```javascript
const { colors } = useTheme()

// Available color properties:
colors.primary      // '#FF6B6B' (red)
colors.secondary    // '#4ECDC4' (teal)
colors.accent       // '#FFE66D' (yellow)
colors.background   // '#0F1419' (dark navy)
colors.surface      // '#1a202c' (lighter navy)
colors.text         // '#FFFFFF' (white)
colors.textSecondary // '#B0B0B0' (light gray)
colors.textLight    // '#808080' (medium gray)
colors.error        // '#FF6B6B' (red)
colors.success      // '#51CF66' (green)
```

---

## Error Handling

### Fixed Navigation Issues:

1. **CategoryScreen Error** ✅
   - Issue: Undefined `isDarkMode` variable
   - Fix: Removed from `createStyles` call
   - Location: Line 81

2. **VendorDetailScreen Errors** ✅
   - Issue: Undefined `COLORS` references
   - Fix: Changed to `colors` from `useTheme()` hook
   - Locations: Lines 40, 89, 93, 96, etc.

3. **HomeScreen Navigation** ✅
   - Issue: Notifications bell button not clickable
   - Fix: Added `onPress` handler
   - Location: Line 135

4. **ProfileScreen Navigation** ✅
   - Issue: Menu items without navigation handlers
   - Fix: Added `onPress` handlers to all items
   - Location: Lines 19-24

---

## Testing the Navigation

### Step-by-step test:

1. **Launch app** → LoginScreen appears
2. **Login** with `user@example.com` / `password123`
3. **MainApp opens** → HomeScreen appears with category cards
4. **Tap a category** → CategoryScreen opens
5. **Select state & city** → Vendor list updates
6. **Tap a vendor** → VendorDetailScreen opens
7. **Tap back** → Returns to CategoryScreen
8. **Tap home icon** → Returns to HomeScreen
9. **Tap notifications bell** → NotificationsScreen opens
10. **Tap profile tab** → ProfileScreen opens
11. **Tap settings** → SettingsScreen opens

---

## Future Navigation Enhancements

Potential features to add:

1. **Search Navigation:**
   - Add search results screen
   - Navigate from search to vendor details

2. **Bookings Flow:**
   - Add booking confirmation screen
   - Show booking details

3. **Saved Vendors:**
   - Create saved vendors screen
   - Navigate from profile to saved vendors

4. **Event Details:**
   - Create featured event details screen
   - Navigate from featured card to event details

5. **User Filters:**
   - Create advanced filters screen
   - Apply filters to vendor list

---

## Best Practices

1. **Always use `useTheme()` for colors** - Don't hardcode colors
2. **Pass navigation data via params** - Don't use global state for navigation
3. **Use proper screen names** - Match screen names in Stack.Screen and navigate calls
4. **Handle back button** - Provide navigation.goBack() for all screens
5. **Test on real devices** - Navigation can behave differently on different screens
6. **Keep navigation logic in screen components** - Don't mix navigation with business logic

---

## Troubleshooting

### Issue: Screen doesn't navigate
- Check: Screen name in Stack.Screen matches navigation.navigate() call
- Check: All required params are passed
- Check: Component is inside proper navigator

### Issue: Images don't appear
- Check: Image file exists in `src/assets/images/`
- Check: Import path is correct
- Check: Image file format is supported (.jpg, .png)

### Issue: Navigation stuck
- Check: No infinite loops in navigation calls
- Check: Back button properly calls navigation.goBack()
- Check: Navigation reset is used correctly for login flow

---

**Last Updated:** December 29, 2025  
**All Navigation Issues:** FIXED ✅
