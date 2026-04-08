import { Song } from '../types';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 243,
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Vibe',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 198,
  },
  {
    id: '3',
    title: 'Serenity',
    artist: 'Calm Waves',
    coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 267,
  },
  {
    id: '4',
    title: 'Neon City Nights',
    artist: 'Synth Wave',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 245,
  },
  {
    id: '5',
    title: 'Ocean Breeze',
    artist: 'Coastal Vibes',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 220,
  },
];

export const moodPlaylists = [
  {
    name: 'Chill Vibes',
    songs: [mockSongs[2], mockSongs[4]],
    color: '#00D9FF',
  },
  {
    name: 'Energy Boost',
    songs: [mockSongs[1], mockSongs[3]],
    color: '#FF0080',
  },
  {
    name: 'Focus Mode',
    songs: [mockSongs[0], mockSongs[2]],
    color: '#A78BFA',
  },
];
