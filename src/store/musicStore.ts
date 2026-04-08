import { create } from 'zustand';
import { Song, Playlist, ColorPreset } from '../types';
import { mockSongs } from '../data/mockSongs';

interface MusicStore {
  // Playback
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  playHistory: Song[];

  // Library
  likedSongs: Song[];
  playlists: Playlist[];

  // Customization
  dominantColor: string;
  colorPreset: ColorPreset;
  autoColorEnabled: boolean;

  // Actions
  setCurrentSong: (song: Song) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlayPause: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  undoSkip: () => void;
  setQueue: (songs: Song[]) => void;
  toggleLikeSong: (song: Song) => void;
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  setColorPreset: (preset: ColorPreset) => void;
  setAutoColorEnabled: (enabled: boolean) => void;
  setDominantColor: (color: string) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  // Initial State
  currentSong: mockSongs[0],
  isPlaying: false,
  queue: mockSongs,
  playHistory: [],
  likedSongs: [],
  playlists: [],
  dominantColor: '#FF6B6B',
  colorPreset: {
    name: 'auto',
    saturation: 100,
    opacity: 1,
    disableAnimations: false,
  },
  autoColorEnabled: true,

  // Actions
  setCurrentSong: (song: Song) =>
    set((state) => ({
      currentSong: song,
      playHistory: [song, ...state.playHistory],
    })),

  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),

  togglePlayPause: () =>
    set((state) => ({ isPlaying: !state.isPlaying })),

  skipNext: () =>
    set((state) => {
      if (!state.currentSong) return state;
      const currentIndex = state.queue.findIndex(
        (s) => s.id === state.currentSong?.id
      );
      if (currentIndex < state.queue.length - 1) {
        return {
          currentSong: state.queue[currentIndex + 1],
          playHistory: [state.queue[currentIndex + 1], ...state.playHistory],
        };
      }
      return state;
    }),

  skipPrevious: () =>
    set((state) => {
      if (!state.currentSong || state.playHistory.length === 0) return state;
      const prevSong = state.playHistory[0];
      return {
        currentSong: prevSong,
        playHistory: state.playHistory.slice(1),
      };
    }),

  undoSkip: () =>
    set((state) => {
      if (state.playHistory.length < 2) return state;
      const prevSong = state.playHistory[1];
      return {
        currentSong: prevSong,
        playHistory: [state.currentSong!, ...state.playHistory.slice(1)],
      };
    }),

  setQueue: (songs: Song[]) => set({ queue: songs }),

  toggleLikeSong: (song: Song) =>
    set((state) => {
      const isLiked = state.likedSongs.some((s) => s.id === song.id);
      if (isLiked) {
        return {
          likedSongs: state.likedSongs.filter((s) => s.id !== song.id),
        };
      }
      return {
        likedSongs: [...state.likedSongs, song],
      };
    }),

  createPlaylist: (name: string) =>
    set((state) => ({
      playlists: [
        ...state.playlists,
        {
          id: Date.now().toString(),
          name,
          songs: [],
          createdAt: new Date(),
        },
      ],
    })),

  addSongToPlaylist: (playlistId: string, song: Song) =>
    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, songs: [...p.songs, song] }
          : p
      ),
    })),

  setColorPreset: (preset: ColorPreset) => set({ colorPreset: preset }),

  setAutoColorEnabled: (enabled: boolean) =>
    set({ autoColorEnabled: enabled }),

  setDominantColor: (color: string) => set({ dominantColor: color }),
}));
