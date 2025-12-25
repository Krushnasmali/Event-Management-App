import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const SectionTitle = ({ title, color = COLORS.primary, showUnderline = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <View style={styles.badgeDot} />
      </View>
      {showUnderline && (
        <View style={styles.underlineRow}>
          <View style={[styles.underline, { backgroundColor: color }]} />
          <View style={styles.underlineFaint} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surface,
    marginLeft: SPACING.xs,
  },
  underlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    height: 3,
    width: 40,
    borderRadius: 1.5,
  },
  underlineFaint: {
    height: 2,
    flex: 1,
    marginLeft: 4,
    borderRadius: 1,
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
});

export default SectionTitle;
