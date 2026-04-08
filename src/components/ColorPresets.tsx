import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusicStore } from '../store/musicStore';
import { getPresetColors } from '../utils/colorExtractor';

interface ColorPresetsProps {
  onClose: () => void;
}

export const ColorPresets: React.FC<ColorPresetsProps> = ({ onClose }) => {
  const {
    colorPreset,
    autoColorEnabled,
    dominantColor,
    setColorPreset,
    setAutoColorEnabled,
  } = useMusicStore();

  const [manualIntensity, setManualIntensity] = useState(100);

  const presets = [
    { name: 'auto' as const, label: 'Auto', icon: 'sparkles' },
    { name: 'chill' as const, label: 'Chill', icon: 'leaf' },
    { name: 'neon' as const, label: 'Neon', icon: 'flash' },
    { name: 'minimal' as const, label: 'Minimal', icon: 'remove-circle' },
    { name: 'low-stimulus' as const, label: 'Low Stimulus', icon: 'remove' },
  ];

  const handlePresetChange = (presetName: any) => {
    if (presetName === 'auto') {
      setColorPreset({
        name: 'auto',
        saturation: 100,
        opacity: 1,
        disableAnimations: false,
      });
    } else {
      const presetConfig = getPresetColors(presetName);
      setColorPreset({
        name: presetName,
        ...presetConfig,
      });
    }
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.panel}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Customization</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Auto Color Toggle */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Auto Color</Text>
                <Switch
                  value={autoColorEnabled}
                  onValueChange={setAutoColorEnabled}
                  trackColor={{ false: '#333333', true: dominantColor }}
                />
              </View>
              <Text style={styles.sectionDescription}>Extract color from album art</Text>
            </View>

            {/* Intensity Slider */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Intensity</Text>
              <View style={styles.sliderContainer}>
                <Ionicons name="volume-mute" size={20} color="#999999" />
                <View
                  style={[
                    styles.sliderTrack,
                    {
                      backgroundColor: `${dominantColor}33`,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.sliderFill,
                      {
                        width: `${manualIntensity}%`,
                        backgroundColor: dominantColor,
                      },
                    ]}
                  />
                </View>
                <Ionicons name="volume-high" size={20} color={dominantColor} />
              </View>
              <Text style={styles.sliderValue}>{manualIntensity}%</Text>
            </View>

            {/* Color Presets */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Presets</Text>
              <View style={styles.presetGrid}>
                {presets.map((preset) => (
                  <TouchableOpacity
                    key={preset.name}
                    style={[
                      styles.presetButton,
                      colorPreset.name === preset.name && styles.presetButtonActive,
                      {
                        borderColor:
                          colorPreset.name === preset.name
                            ? dominantColor
                            : '#333333',
                      },
                    ]}
                    onPress={() => handlePresetChange(preset.name)}
                  >
                    <Ionicons
                      name={preset.icon as any}
                      size={24}
                      color={
                        colorPreset.name === preset.name
                          ? dominantColor
                          : '#999999'
                      }
                    />
                    <Text
                      style={[
                        styles.presetLabel,
                        colorPreset.name === preset.name && {
                          color: dominantColor,
                        },
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Info */}
            <View style={[styles.section, styles.infoSection]}>
              <Text style={styles.infoText}>
                {colorPreset.disableAnimations
                  ? 'Animations disabled for a calmer experience'
                  : 'Smooth animations enabled'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    color: '#999999',
    fontSize: 12,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderValue: {
    color: '#999999',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  presetButton: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginBottom: 12,
  },
  presetButtonActive: {
    backgroundColor: '#2A2A2A',
  },
  presetLabel: {
    color: '#999999',
    fontSize: 11,
    marginTop: 8,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 18,
  },
});
