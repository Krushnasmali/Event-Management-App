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
import LinearGradient from 'react-native-linear-gradient';
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
      color: '#8B5CF6',
      unread: true,
      tag: 'Booking',
    },
    {
      id: 2,
      icon: 'star',
      title: 'Rate Your Service',
      message: 'Please rate your recent catering service',
      time: '5 hours ago',
      color: '#FBBF24',
      unread: false,
      tag: 'Feedback',
    },
    {
      id: 3,
      icon: 'phone',
      title: 'Service Provider Called',
      message: 'Your Hall vendor has called you',
      time: '1 day ago',
      color: '#34D399',
      unread: false,
      tag: 'Update',
    },
  ];

  const hasNotifications = notifications.length > 0;
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B061A" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0B061A', '#1A0B3D', '#2A0E6F']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>
          Stay updated with your bookings & vendors
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={
          hasNotifications ? styles.list : styles.emptyWrapper
        }
        showsVerticalScrollIndicator={false}
      >
        {hasNotifications ? (
          <>
            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity>
                <Text style={styles.actionPrimary}>Mark all as read</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.actionSecondary}>Clear all</Text>
              </TouchableOpacity>
            </View>

            {notifications.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={[
                  styles.notificationCard,
                  item.unread && styles.unreadCard,
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.color + '22' },
                  ]}
                >
                  <Icon name={item.icon} size={22} color={item.color} />
                </View>

                <View style={styles.content}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.tag && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.message} numberOfLines={2}>
                    {item.message}
                  </Text>

                  <View style={styles.timeRow}>
                    <Icon
                      name="clock-outline"
                      size={13}
                      color="#AAA"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                {item.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="bell-off-outline" size={64} color="#AAA" />
            <Text style={styles.emptyTitle}>You're all caught up</Text>
            <Text style={styles.emptyText}>
              New notifications will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0B061A',
    },

    header: {
      padding: SPACING.xl,
      paddingBottom: SPACING.lg,
    },

    headerTitle: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.black,
      color: '#fff',
    },

    headerSubtitle: {
      marginTop: 4,
      fontSize: FONT_SIZE.sm,
      color: '#AAA',
    },

    list: {
      padding: SPACING.lg,
      paddingBottom: 140,
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

    actionPrimary: {
      color: '#8B5CF6',
      fontWeight: FONT_WEIGHT.semibold,
    },

    actionSecondary: {
      color: '#AAA',
    },

    notificationCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.md,
      marginBottom: SPACING.md,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.12)',
    },

    unreadCard: {
      borderLeftWidth: 3,
      borderLeftColor: '#8B5CF6',
    },

    iconBox: {
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
      marginBottom: 4,
    },

    title: {
      flex: 1,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.semibold,
      color: '#fff',
    },

    tag: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.15)',
    },

    tagText: {
      fontSize: FONT_SIZE.xs,
      color: '#DDD',
    },

    message: {
      fontSize: FONT_SIZE.sm,
      color: '#AAA',
      marginBottom: 6,
    },

    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    time: {
      fontSize: FONT_SIZE.xs,
      color: '#AAA',
    },

    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#8B5CF6',
      marginLeft: 8,
      marginTop: 6,
    },

    emptyContainer: {
      alignItems: 'center',
    },

    emptyTitle: {
      marginTop: 16,
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.bold,
      color: '#fff',
    },

    emptyText: {
      marginTop: 6,
      fontSize: FONT_SIZE.sm,
      color: '#AAA',
      textAlign: 'center',
    },
  });
