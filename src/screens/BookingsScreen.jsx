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

const BookingsScreen = () => {
  const hasBookings = false;

  if (!hasBookings) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0B061A" />

        {/* Background Gradient */}
        <LinearGradient
          colors={['#0B061A', '#1A0B3D', '#2A0E6F']}
          style={StyleSheet.absoluteFill}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Bookings</Text>
            <Text style={styles.headerSub}>Track your reservations</Text>
          </View>

          {/* Empty State Icon */}
          <View style={styles.hero}>
            <LinearGradient
              colors={['#7B3FE4', '#4F2BAF']}
              style={styles.iconCircle}
            >
              <Icon name="calendar-star" size={64} color="#fff" />
            </LinearGradient>

            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyDesc}>
              Your upcoming events will appear here once you make your first
              reservation
            </Text>
          </View>

          {/* Action Cards */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryCard}>
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                style={styles.cardInner}
              >
                <Icon name="rocket-launch" size={26} color="#fff" />
                <Text style={styles.cardTitle}>Explore Events</Text>
                <Text style={styles.cardSub}>Find perfect vendors</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryCard}>
              <Icon name="bookmark-outline" size={26} color="#8B5CF6" />
              <Text style={styles.secTitle}>Saved Events</Text>
              <Text style={styles.secSub}>Your wishlist</Text>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={styles.tips}>
            <Text style={styles.tipsHeader}>Get Started</Text>

            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Icon name="map-marker-outline" size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.tipTitle}>Browse nearby</Text>
                <Text style={styles.tipDesc}>
                  Find events in your location
                </Text>
              </View>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipIcon}>
                <Icon name="star-outline" size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.tipTitle}>Check ratings</Text>
                <Text style={styles.tipDesc}>
                  Choose top-rated vendors
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 140 }} />
        </ScrollView>

        {/* Bottom Tab Preview */}
        <View style={styles.bottomTab}>
          <Icon name="home-outline" size={24} color="#999" />
          <Icon name="ticket-outline" size={26} color="#8B5CF6" />
          <Icon name="bell-outline" size={24} color="#999" />
          <Icon name="account-outline" size={24} color="#999" />
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B061A',
  },

  header: {
    padding: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },

  headerSub: {
    color: '#AAA',
    marginTop: 4,
  },

  hero: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 30,
  },

  iconCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  emptyDesc: {
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: 40,
  },

  primaryCard: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },

  cardInner: {
    paddingVertical: 26,
    alignItems: 'center',
    gap: 6,
  },

  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  cardSub: {
    color: '#E5E5E5',
    fontSize: 12,
  },

  secondaryCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    paddingVertical: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  secTitle: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 6,
  },

  secSub: {
    color: '#AAA',
    fontSize: 12,
  },

  tips: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  tipsHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },

  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  tipIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(139,92,246,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  tipTitle: {
    color: '#fff',
    fontWeight: '600',
  },

  tipDesc: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 2,
  },

  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#0B061A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
});
