import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { CATEGORIES_DATA } from '../data/categoriesData';
import CategoryCard from '../components/CategoryCard';
import { COLORS } from '../theme/colors';
import { SPACING, FONT_SIZE, FONT_WEIGHT } from '../theme/spacing';

const HomeScreen = ({ navigation }) => {
  const handleCategoryPress = useCallback(
    (category) => {
      navigation.navigate('CategoryScreen', {
        categoryName: category.name,
        categoryId: category.id,
        categoryColor: category.color,
        categoryDescription: category.description,
      });
    },
    [navigation]
  );

  const renderCategoryItem = ({ item }) => (
    <CategoryCard
      item={item}
      onPress={() => handleCategoryPress(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>EventoBooking</Text>
      <Text style={styles.headerSubtitle}>Find & Book Perfect Event Services</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <FlatList
        data={CATEGORIES_DATA}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  columnWrapper: {
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.background,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.background,
    opacity: 0.9,
  },
});

export default HomeScreen;
