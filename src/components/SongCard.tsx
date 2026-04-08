import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Song } from '../types';
import { useMusicStore } from '../store/musicStore';

interface SongCardProps {
  song: Song;
  showArtist?: boolean;
  onPress?: () => void;
  accentColor: string;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  showArtist = true,
  onPress,
  accentColor,
}) => {
  const { likedSongs, toggleLikeSong } = useMusicStore();
  const isLiked = likedSongs.some((s) => s.id === song.id);

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
        <Image source={{ uri: song.coverImage }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {song.title}
          </Text>
          {showArtist && (
            <Text style={styles.artist} numberOfLines={1}>
              {song.artist}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleLikeSong(song)}
        style={styles.likeButton}
      >
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color={isLiked ? accentColor : '#999999'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: '#999999',
    fontSize: 13,
    marginTop: 4,
  },
  likeButton: {
    padding: 8,
  },
});