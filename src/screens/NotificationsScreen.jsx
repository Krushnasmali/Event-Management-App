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
import { useTheme } from '../theme/ThemeContext';
import { SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS } from '../theme/spacing';

const NotificationsScreen = () => {
  const { colors } = useTheme();
  const notifications = [
    {
      id: 1,
      icon: 'calendar-check',
      title: 'Booking Confirmed',
      message: 'Your DJ booking for 25th Dec is confirmed',
      time: '2 hours ago',
      color: '#4ECDC4',
      unread: true,
      tag: 'Booking',
    },
    {
      id: 2,
      icon: 'star',
      title: 'Rate Your Service',
      message: 'Please rate your recent catering service',
      time: '5 hours ago',
      color: '#FFE66D',
      unread: false,
      tag: 'Feedback',
    },
    {
      id: 3,
      icon: 'phone',
      title: 'Service Provider Called',
      message: 'Your Hall vendor has called you',
      time: '1 day ago',
      color: '#95E1D3',
      unread: false,
      tag: 'Update',
    },
  ];

  const hasNotifications = notifications.length > 0;
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>
          Stay updated with your bookings and vendors
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          hasNotifications ? styles.notificationsList : styles.emptyWrapper
        }
        showsVerticalScrollIndicator={false}
      >
        {hasNotifications ? (
          <>
            <View style={styles.actionsRow}>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.actionText}>Mark all as read</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.actionTextSecondary}>Clear all</Text>
              </TouchableOpacity>
            </View>

            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  notification.unread && styles.unreadCard,
                ]}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.color + '22' },
                  ]}
                >
                  <Icon
                    name={notification.icon}
                    size={22}
                    color={notification.color}
                  />
                </View>

                <View style={styles.content}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{notification.title}</Text>
                    {!!notification.tag && (
                      <View style={styles.tagChip}>
                        <Text style={styles.tagText}>{notification.tag}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.message} numberOfLines={2}>
                    {notification.message}
                  </Text>
                  <View style={styles.metaRow}>
                    <Icon
                      name="clock-outline"
                      size={14}
                      color={colors.textLight}
                      style={styles.timeIcon}
                    />
                    <Text style={styles.time}>{notification.time}</Text>
                  </View>
                </View>

                {notification.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon
              name="bell-off-outline"
              size={64}
              color={colors.textLight}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>You're all caught up</Text>
            <Text style={styles.emptyText}>
              New notifications about your bookings and vendors will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
      paddingBottom: SPACING.lg,
      backgroundColor: colors.surface,
      borderBottomLeftRadius: SPACING.xl,
      borderBottomRightRadius: SPACING.xl,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    },
    headerTitle: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.text,
    },
    headerSubtitle: {
      marginTop: SPACING.xs,
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
    },
    scrollView: {
      flex: 1,
    },
    notificationsList: {
      padding: SPACING.lg,
      paddingBottom: SPACING.xxxl,
    },
    emptyWrapper: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: SPACING.lg,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SPACING.md,
    },
    actionText: {
      fontSize: FONT_SIZE.sm,
      color: colors.primary,
      fontWeight: FONT_WEIGHT.semibold,
    },
    actionTextSecondary: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.md,
      marginBottom: SPACING.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    },
    unreadCard: {
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    iconContainer: {
      width: 46,
      height: 46,
      borderRadius: BORDER_RADIUS.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    content: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.xs,
    },
    title: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
      color: colors.text,
      flex: 1,
    },
    tagChip: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      borderRadius: SPACING.lg,
      backgroundColor: colors.background,
    },
    tagText: {
      fontSize: FONT_SIZE.xs,
      color: colors.textSecondary,
    },
    message: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
      marginBottom: SPACING.xs,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeIcon: {
      marginRight: 4,
    },
    time: {
      fontSize: FONT_SIZE.xs,
      color: colors.textLight,
    },
    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
      marginLeft: SPACING.sm,
      marginTop: SPACING.xs,
    },
    emptyContainer: {
      alignItems: 'center',
    },
    emptyIcon: {
      marginBottom: SPACING.lg,
      opacity: 0.6,
    },
    emptyTitle: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.text,
      marginBottom: SPACING.xs,
    },
    emptyText: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

export default NotificationsScreen;
