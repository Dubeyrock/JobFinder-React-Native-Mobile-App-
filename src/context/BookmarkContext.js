import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

const STORAGE_KEY = '@jobfinder_bookmarks';

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load bookmarks from AsyncStorage on mount
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = async (updatedBookmarks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const addBookmark = (job) => {
    const updated = [...bookmarks, job];
    setBookmarks(updated);
    saveToStorage(updated);
  };

  const removeBookmark = (jobId) => {
    const updated = bookmarks.filter((job) => job.id !== jobId);
    setBookmarks(updated);
    saveToStorage(updated);
  };

  const isBookmarked = (jobId) => {
    return bookmarks.some((job) => job.id === jobId);
  };

  const toggleBookmark = (job) => {
    if (isBookmarked(job.id)) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        loading,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
