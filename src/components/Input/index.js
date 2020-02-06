import React, { Component  } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

class Input extends Component {
  render(){
    const { style, placeholder, editable, value, secureTextEntry, keyboardType, returnKeyType, onFocus, onChangeText, numberOfLines, onSubmitEditing, refInput, maxLength, multiline } = this.props;
    return(
      <View style={styles.block}>
        <Text style={styles.text_top}>{placeholder}</Text>
        <View style={[styles.row, style]}>
          <TextInput
            editable={editable}
            style={styles.textInput}
            autoCorrect={false}
            placeholder={''}
            placeholderTextColor='rgba(0, 0, 0, 1)'
            selectionColor='rgba(0, 0, 0, 1)'
            underlineColorAndroid='transparent'
            value={value}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType ? returnKeyType : 'done'}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            onFocus={() => {
              if(typeof onFocus === 'function'){
                this.props.onFocus();
              }
            }}
            ref={(ref) => {
              if(ref){
                this._inputElement = ref;
                if(typeof refInput === 'function'){
                  this.props.refInput(ref);
                }
              }
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    minHeight: 60,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor : '#000',
  },
  textInput: {
    flex: 1,
    padding: 0,
    color: "#000",
    fontSize: 18,
  },
  text_top: {
    color: "#000",
    fontSize: 16,
  }
});

export default Input
