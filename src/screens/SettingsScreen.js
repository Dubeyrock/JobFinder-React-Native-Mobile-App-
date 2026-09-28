import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  const settingItems = [
    {
      icon: isDark ? 'moon' : 'sunny',
      label: 'Dark Mode',
      subtitle: isDark ? 'Dark theme is active' : 'Light theme is active',
      isToggle: true,
      value: isDark,
      onToggle: toggleTheme,
    },
    {
      icon: 'logo-github',
      label: 'Source Code',
      subtitle: 'View on GitHub',
      onPress: () => Linking.openURL('https://github.com'),
    },
    {
      icon: 'globe-outline',
      label: 'API: Remotive',
      subtitle: 'Free remote jobs API',
      onPress: () => Linking.openURL('https://remotive.com/api/remote-jobs'),
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>

      <View style={styles.content}>
        {/* Settings Items */}
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.settingItem,
                index < settingItems.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
              onPress={item.isToggle ? undefined : item.onPress}
              activeOpacity={item.isToggle ? 1 : 0.7}
            >
              <View style={[styles.settingIcon, { backgroundColor: colors.chipBg }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {item.label}
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textTertiary }]}>
                  {item.subtitle}
                </Text>
              </View>
              {item.isToggle ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: colors.border, true: colors.primaryLight }}
                  thumbColor={item.value ? colors.primary : colors.textTertiary}
                />
              ) : (
                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appName, { color: colors.primary }]}>JobFinder</Text>
          <Text style={[styles.appVersion, { color: colors.textTertiary }]}>
            Version 1.0.0 • Built with React Native + Expo
          </Text>
          <Text style={[styles.appCredit, { color: colors.textTertiary }]}>
            Powered by Remotive API
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
  },
  appVersion: {
    fontSize: 12,
    marginTop: 4,
  },
  appCredit: {
    fontSize: 11,
    marginTop: 2,
  },
});
