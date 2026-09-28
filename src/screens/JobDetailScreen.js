import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { formatDate, stripHtml } from '../services/api';

export default function JobDetailScreen({ route, navigation }) {
  const { job } = route.params;
  const { colors, isDark } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(job.id);

  const handleApply = () => {
    if (job.url) {
      Linking.openURL(job.url);
    }
  };

  const description = stripHtml(job.description);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Job Details
        </Text>
        <TouchableOpacity
          style={styles.bookmarkHeaderBtn}
          onPress={() => toggleBookmark(job)}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={bookmarked ? '#FBBF24' : '#FFF'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Info Card */}
        <View style={[styles.companyCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.companyRow}>
            {job.company_logo ? (
              <Image
                source={{ uri: job.company_logo }}
                style={[styles.companyLogo, { backgroundColor: colors.surfaceElevated }]}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.logoFallback, { backgroundColor: colors.chipBg }]}>
                <Text style={[styles.logoText, { color: colors.primary }]}>
                  {job.company_name ? job.company_name.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
            )}
            <View style={styles.companyInfo}>
              <Text style={[styles.jobTitle, { color: colors.text }]}>
                {job.title}
              </Text>
              <Text style={[styles.companyName, { color: colors.primary }]}>
                {job.company_name}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={[styles.quickInfoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.quickInfoRow}>
            <View style={styles.quickInfoItem}>
              <View style={[styles.quickInfoIcon, { backgroundColor: colors.chipBg }]}>
                <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.quickInfoLabel, { color: colors.textTertiary }]}>Type</Text>
              <Text style={[styles.quickInfoValue, { color: colors.text }]}>
                {job.job_type ? job.job_type.replace('_', ' ') : 'N/A'}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.quickInfoItem}>
              <View style={[styles.quickInfoIcon, { backgroundColor: colors.chipBg }]}>
                <Ionicons name="location-outline" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.quickInfoLabel, { color: colors.textTertiary }]}>Location</Text>
              <Text style={[styles.quickInfoValue, { color: colors.text }]} numberOfLines={2}>
                {job.candidate_required_location || 'Anywhere'}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.quickInfoItem}>
              <View style={[styles.quickInfoIcon, { backgroundColor: colors.chipBg }]}>
                <Ionicons name="time-outline" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.quickInfoLabel, { color: colors.textTertiary }]}>Posted</Text>
              <Text style={[styles.quickInfoValue, { color: colors.text }]}>
                {formatDate(job.publication_date)}
              </Text>
            </View>
          </View>

          {job.salary && job.salary.trim() !== '' && (
            <View style={[styles.salaryRow, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
              <Ionicons name="cash-outline" size={18} color="#059669" />
              <Text style={styles.salaryText}>{job.salary}</Text>
            </View>
          )}
        </View>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <View style={[styles.tagsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Skills & Tags</Text>
            <View style={styles.tagsWrap}>
              {job.tags.map((tag, index) => (
                <View key={index} style={[styles.tagChip, { backgroundColor: colors.chipBg }]}>
                  <Text style={[styles.tagChipText, { color: colors.chipText }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description */}
        <View style={[styles.descriptionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Description</Text>
          <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
            {description || 'No description available.'}
          </Text>
        </View>

        {/* Extra spacing at bottom for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Apply Button */}
      <View style={[styles.applyContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.applyBtn, { backgroundColor: colors.primary }]}
          onPress={handleApply}
          activeOpacity={0.8}
        >
          <Ionicons name="open-outline" size={18} color="#FFF" />
          <Text style={styles.applyBtnText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveBtn, { borderColor: colors.primary }]}
          onPress={() => toggleBookmark(job)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  bookmarkHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  companyCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  logoFallback: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
  },
  companyInfo: {
    flex: 1,
    marginLeft: 14,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickInfoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickInfoLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  quickInfoValue: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 50,
    marginHorizontal: 4,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
    gap: 8,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    flex: 1,
  },
  tagsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  applyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    gap: 10,
  },
  applyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  saveBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
