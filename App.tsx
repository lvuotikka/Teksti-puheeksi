import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function Index() {
  const [text, setText] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const languages = ['en-US', 'fi-FI', 'sv-SE'];

  const speak = async () => {
    try {
      if (!text.trim()) {
        Alert.alert('Huomio', 'Kirjoita jotain tekstiä ensin!');
        return;
      }

      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }

      Speech.speak(text, {
        language: languages[selectedIndex],
      });
    } catch (error) {
      Alert.alert('Virhe', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['English', 'Finnish', 'Swedish']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.segmentedControl}
      />

      <TextInput
        style={styles.input}
        placeholder="Type something here..."
        value={text}
        onChangeText={setText}
      />

      <View style={styles.buttonContainer}>
        <Button title="SAY IT" onPress={speak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  segmentedControl: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    width: '40%',
  },
});