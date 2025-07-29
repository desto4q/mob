import React, { FC } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps{
  checked: boolean;
  onChange: (checked: boolean) => void;
 
}

const Checkbox:FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!checked)} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Default background for unchecked state
  },
  checked: {
    backgroundColor: '#007BFF', // Background color when checked
  },
});

export default Checkbox;
