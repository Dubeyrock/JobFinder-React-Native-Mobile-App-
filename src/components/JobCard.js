import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../context/BookmarkContext';
import { formatDate } from '../services/api';

export default function JobCard({ job, onPress }) {
  const { colors } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(job.id);

  // Get company logo or use a fallback
  const logoUrl = job.company_logo
    ? job.company_logo
    : null;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.cardShadow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.logoContainer}>
          {logoUrl ? (
            <Image
              source={{ uri: logoUrl }}
              style={[styles.logo, { backgroundColor: colors.surfaceElevated }]}
              resizeMode="contain"
            />
          ) : (
            <View
              style={[
                styles.logoFallback,
                { backgroundColor: colors.chipBg },
              ]}
            >
              <Text style={[styles.logoText, { color: colors.primary }]}>
                {job.company_name ? job.company_name.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.headerInfo}>
          <Text
            style={[styles.jobTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {job.title}
          </Text>
          <Text
            style={[styles.companyName, { color: colors.primary }]}
            numberOfLines={1}
          >
            {job.company_name}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => toggleBookmark(job)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={bookmarked ? colors.bookmark : colors.textTertiary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tagsRow}>
        {job.job_type && (
          <View style={[styles.tag, { backgroundColor: colors.chipBg }]}>
            <Ionicons name="briefcase-outline" size={12} color={colors.chipText} />
            <Text style={[styles.tagText, { color: colors.chipText }]}>
              {job.job_type.replace('_', ' ')}
            </Text>
          </View>
        )}
        {job.candidate_required_location && (
          <View style={[styles.tag, { backgroundColor: colors.chipBg }]}>
            <Ionicons name="location-outline" size={12} color={colors.chipText} />
            <Text
              style={[styles.tagText, { color: colors.chipText }]}
              numberOfLines={1}
            >
              {job.candidate_required_location.length > 20
                ? job.candidate_required_location.substring(0, 20) + '...'
                : job.candidate_required_location}
            </Text>
          </View>
        )}
        {job.salary && job.salary.trim() !== '' && (
          <View style={[styles.tag, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="cash-outline" size={12} color="#059669" />
            <Text style={[styles.tagText, { color: '#059669' }]}>
              {job.salary.length > 20
                ? job.salary.substring(0, 20) + '...'
                : job.salary}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
          <Text style={[styles.dateText, { color: colors.textTertiary }]}>
            {formatDate(job.publication_date)}
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '15' }]}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>
            {job.category || 'Remote'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  logoFallback: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
    marginRight: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 3,
  },
  companyName: {
    fontSize: 13,
    fontWeight: '600',
  },
  bookmarkBtn: {
    padding: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
