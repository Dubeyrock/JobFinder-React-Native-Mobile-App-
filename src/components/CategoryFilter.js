import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.value;
        return (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.chipActiveBg : colors.chipBg,
                borderColor: isActive ? colors.chipActiveBg : colors.border,
              },
            ]}
            onPress={() => onSelectCategory(cat.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isActive ? colors.chipActiveText : colors.chipText,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
});
