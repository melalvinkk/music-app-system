import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { useMusicStore } from '../store/musicStore';
import { ColorPresets } from './ColorPresets';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    skipNext,
    skipPrevious,
    dominantColor,
    colorPreset,
  } = useMusicStore();

  const [progress, setProgress] = useState(0);
  const [showColorPanel, setShowColorPanel] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (!isPlaying || !currentSong) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          skipNext();
          return 0;
        }
        return prev + (100 / currentSong.duration / 10); // Simulate playback
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentSong, skipNext]);

  if (!currentSong) return null;

  const accentColor = dominantColor;

  return (
    <>
      {/* Mini Player */}
      <TouchableOpacity
        style={[styles.miniPlayer, { borderTopColor: accentColor }]}
        onPress={() => setShowPlayer(true)}
      >
        <Image
          source={{ uri: currentSong.coverImage }}
          style={styles.miniCover}
        />
        <View style={styles.miniInfo}>
          <Text style={styles.miniTitle} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.miniArtist} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={accentColor}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Full Screen Player Modal */}
      <Modal
        visible={showPlayer}
        animationType="slide"
        onRequestClose={() => setShowPlayer(false)}
      >
        <View style={[styles.playerContainer, { backgroundColor: '#000000' }]}>  
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowPlayer(false)}>
              <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Now Playing</Text>
            <TouchableOpacity
              onPress={() => setShowColorPanel(true)}
              style={[styles.customizeButton, { borderColor: accentColor }]}
            >
              <Ionicons name="settings" size={24} color={accentColor} />
            </TouchableOpacity>
          </View>

          {/* Album Art */}
          <View style={styles.albumArtContainer}>
            <Image
              source={{ uri: currentSong.coverImage }}
              style={[styles.albumArt, { borderColor: accentColor }]}
            />
          </View>

          {/* Song Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.artistName}>{currentSong.artist}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                  backgroundColor: accentColor,
                },
              ]}
            />
          </View>

          {/* Time Display */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>  
              {Math.floor((progress / 100) * currentSong.duration / 60)}:
              {String(Math.floor(((progress / 100) * currentSong.duration) % 60)).padStart(
                2,
                '0'
              )}
            </Text>
            <Text style={styles.timeText}>  
              {Math.floor(currentSong.duration / 60)}:
              {String(currentSong.duration % 60).padStart(2, '0')}
            </Text>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={skipPrevious}>
              <Ionicons name="play-skip-back" size={32} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.playButton,
                { backgroundColor: accentColor, opacity: colorPreset.opacity },
              ]}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={48}
                color="#000000"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipNext}>
              <Ionicons name="play-skip-forward" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Undo Skip Button */}
          <TouchableOpacity
            style={[
              styles.undoButton,
              { borderColor: accentColor, opacity: 0.7 },
            ]}
          >
            <Ionicons name="arrow-undo" size={20} color={accentColor} />
            <Text style={[styles.undoText, { color: accentColor }]}>Undo Skip</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Color Presets Panel */}
      {showColorPanel && (
        <ColorPresets onClose={() => setShowColorPanel(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 2,
  },
  miniCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  miniInfo: {
    flex: 1,
  },
  miniTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  miniArtist: {
    color: '#999999',
    fontSize: 12,
    marginTop: 2,
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  customizeButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  albumArt: {
    width: width - 64,
    height: width - 64,
    borderRadius: 16,
    borderWidth: 2,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  artistName: {
    color: '#999999',
    fontSize: 14,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#333333',
    marginHorizontal: 16,
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  timeText: {
    color: '#999999',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  undoText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});