import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar misión o cohete...',
}) => {
  return (
    <View style={styles.container}>
      <MagnifyingGlassIcon size={20} color="#6B7280" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 32,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#1F2937',
  },
});

export default SearchBar;
