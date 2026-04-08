export interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  createdAt: string;
}

export interface ColorPreset {
  name: 'auto' | 'chill' | 'neon' | 'minimal' | 'low-stimulus';
  saturation: number;
  opacity: number;
  disableAnimations: boolean;
}

export interface AppState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  likedSongs: Song[];
  playlists: Playlist[];
  colorPreset: ColorPreset;
  dominantColor: string;
  autoColorEnabled: boolean;
}