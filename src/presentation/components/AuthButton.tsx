

import {  Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

type AuthProps ={
    authButton:string;
    onPress?:() => void;
    disabled:boolean;
}

const AuthButton = ({authButton,onPress,disabled}:AuthProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <Text style={styles.label}>{authButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: moderateScale(317),
    height: moderateScale(55),
    alignSelf: "center",
    borderRadius: moderateScale(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F83758",
      marginTop:moderateScale(52),
      marginBottom:moderateScale(75)
  },
  label: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: 'semibold',
    fontFamily:'Montserrat-Regular',
  
  },
});

export default AuthButton;
