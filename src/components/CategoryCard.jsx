import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 2 - SPACING.md) / 2;

const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 210,
    marginBottom: SPACING.md,
    marginRight: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: BORDER_RADIUS.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    borderRadius: BORDER_RADIUS.lg,
  },
  content: {
    padding: SPACING.md,
    zIndex: 1,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.background,
    opacity: 0.9,
  },
});

export default CategoryCard;
