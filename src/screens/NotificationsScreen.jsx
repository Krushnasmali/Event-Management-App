import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const NotificationsScreen = () => {
  const notifications = [
    {
      id: 1,
      icon: 'calendar-check',
      title: 'Booking Confirmed',
      message: 'Your DJ booking for 25th Dec is confirmed',
      time: '2 hours ago',
      color: '#4ECDC4',
      unread: true,
    },
    {
      id: 2,
      icon: 'star',
      title: 'Rate Your Service',
      message: 'Please rate your recent catering service',
      time: '5 hours ago',
      color: '#FFE66D',
      unread: false,
    },
    {
      id: 3,
      icon: 'phone',
      title: 'Service Provider Called',
      message: 'Your Hall vendor has called you',
      time: '1 day ago',
      color: '#95E1D3',
      unread: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {notifications.length > 0 ? (
          <View style={styles.notificationsList}>
            {notifications.map((notification) => (
              <TouchableOpacity 
                key={notification.id} 
                style={[
                  styles.notificationCard,
                  notification.unread && styles.unreadCard,
                ]}
                activeOpacity={0.7}
              >
                <View 
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.color + '20' },
                  ]}
                >
                  <Icon 
                    name={notification.icon} 
                    size={24} 
                    color={notification.color} 
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.title}>{notification.title}</Text>
                  <Text style={styles.message}>{notification.message}</Text>
                  <Text style={styles.time}>{notification.time}</Text>
                </View>
                {notification.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon 
              name="bell-off" 
              size={64} 
              color={COLORS.textLight} 
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.accent,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  notificationsList: {
    padding: SPACING.lg,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadCard: {
    backgroundColor: '#F0F8FF',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  time: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textLight,
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyIcon: {
    marginBottom: SPACING.xl,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
  },
});

export default NotificationsScreen;
