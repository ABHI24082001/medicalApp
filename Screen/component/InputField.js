import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // You can change it to any vector icon library you are using

const InputField = ({
  label,
  placeholder,
  iconName,
  value,
  onChangeText,
  errorMessage,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  maxLength,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[styles.inputContainer, errorMessage ? styles.errorBorder : {}]}>
        {iconName && (
          <Icon name={iconName} size={20} color="#888" style={styles.icon} />
        )}
        <TextInput      
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#000"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: '#E63946',
    fontSize: 14,
    marginTop: 4,
  },
  errorBorder: {
    borderColor: '#E63946',
  },
});

export default InputField;
