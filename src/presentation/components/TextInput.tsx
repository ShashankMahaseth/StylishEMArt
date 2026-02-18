import {  TextInput, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../res/themes/hook/useTheme';
import { useState } from 'react';
import { Image } from 'react-native';

type Props = {
  placeholder: string;
  keyboardType?: any;
  icon?: any;
  height: number;
  width: number;
  marginStart: number;
  trailingIcon?: any;
  value: any;
  onChangeText?: ((text: any) => void) | undefined;
  secureTextEntry?: boolean | undefined;
  onPress?: (() => void) | undefined;
};

const TextField = ({
  placeholder,
  keyboardType,
  icon,
  height,
  width,
  marginStart,
  trailingIcon,
  value,
  onChangeText,
  secureTextEntry,
  onPress
}: Props) => {
  const [isFocused, setFocused] = useState(false);
  const color = useTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: isFocused ? '#F83758' : color.borderColor },
        { backgroundColor: color.card },
      ]}
    >
      <View style={styles.row}>
        {icon && (
          <Image
            style={[
              styles.icon,
              { height: height, width: width, marginStart: marginStart },
            ]}
            source={icon}
          />
        )}
        <TextInput
          style={[styles.input, { color: color.text }]}
          value={value}
          onChangeText={onChangeText}
          cursorColor="#F83758"
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={color.placeholder}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {trailingIcon && (
          <TouchableOpacity onPress={onPress}>
            <Image style={styles.trailingIcon} source={trailingIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(317),
    height: moderateScale(55),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    marginTop: moderateScale(31),
  },
  input: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    fontSize: moderateScale(16),
    justifyContent: 'center',
    textAlignVertical: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  trailingIcon: {
    marginLeft: moderateScale(17),
    marginEnd: moderateScale(12),
    height: moderateScale(20),
    width: moderateScale(22),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TextField;
