import { View,StyleSheet,Text, Pressable} from "react-native";
import { moderateScale } from "react-native-size-matters";

import TextField from "../components/TextInput";
import { useTheme } from "../../res/themes/hook/useTheme";
import AuthButton from "../components/AuthButton";
import { ScrollView } from "react-native";
import AuthLogo from "../components/AuthLogo";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { loginThunk, signupThunk } from "../store/redux/authThunk";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

import {
  getHasLoggedInBefore,
  setHasLoggedInBefore,
} from "../../core/storage/AsyncStorage";
import { useNavigation } from "@react-navigation/native";

type AuthNav = NativeStackNavigationProp<RootStackParamList, "Auth">;

const AuthScreen = () => {
    const navigation = useNavigation<AuthNav>();
  
    const theme=useTheme();
    const [isSignUp,setSignUp] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] =useState("");
    const [isPasswordSecure, setPasswordSecure] = useState(false);
    const [isConfirmPasswordSecure, setConfirmPasswordSecure] = useState(false);
    const [isForgot,setForgot] =useState(false);
    const dispatch = useAppDispatch();
    const{status,error}=useAppSelector((state)=>state.auth);
    const isLoading = status ==="loading";
    const resetFields = () => {
  setEmail("");
  setPassword("");
  setConfirmPassword("");
};
    const headingText = isForgot
    ? "Forgot\nPassword?"
    : isSignUp
    ? "Create an \naccount"
    : "Welcome\nBack!";
 const reset = isForgot ? "* We will send you a message to set or reset\nyour new password":"";

const handleSubmit = async () => {
    if (isForgot) return;

    const ok = isSignUp
      ? await dispatch(signupThunk({ email, password })).unwrap()
      : await dispatch(loginThunk({ email, password })).unwrap();

    if (!ok) return;

    const hasLoggedInBefore = await getHasLoggedInBefore();
    if (!hasLoggedInBefore) {
      await setHasLoggedInBefore(true);
      navigation.replace("GetStarted");
    } else {
      navigation.replace("Home");
    }
  };

  
  return (
    <ScrollView 
     style={[styles.container, { backgroundColor: theme.background }]}>
     <Text style={[styles.welcomeBack, { color:theme.text }]}>
        {headingText}
     </Text>
    <TextField placeholder="Username or Email"
    value={email}
    onChangeText={setEmail}
    keyboardType='email-address'
    icon={require('../../assets/AuthTextFieldIcon/User.png')}
    height={moderateScale(24)}
    width={moderateScale(24)}
    marginStart={moderateScale(11)}
     />
     {isForgot &&
     <Text style={[styles.resetText, { color: theme.text }]}>
     {reset}
     </Text>
}
   { !isForgot &&
    <TextField placeholder="Password"
    value={password}
    onChangeText={setPassword}
     icon={require('../../assets/AuthTextFieldIcon/lock.png')}
     height={moderateScale(20)}
     width={moderateScale(16)}
     marginStart={moderateScale(15)}
     trailingIcon={ !isPasswordSecure  ? require('../../assets/AuthTextFieldIcon/eye.png'):require('../../assets/AuthTextFieldIcon/hideEye.png')}
     onPress={() => setPasswordSecure((prev) => !prev)}
     secureTextEntry={isPasswordSecure}
     />
   }
   { !isForgot &&
     isSignUp &&
      <TextField placeholder="ConfirmPassword"
      value={confirmPassword}
      onChangeText={setConfirmPassword}
     icon={require('../../assets/AuthTextFieldIcon/lock.png')}
     height={moderateScale(20)}
     width={moderateScale(16)}
     marginStart={moderateScale(15)}
     trailingIcon={!isConfirmPasswordSecure? require('../../assets/AuthTextFieldIcon/eye.png'): 
      require('../../assets/AuthTextFieldIcon/hideEye.png')}
     onPress={() => setConfirmPasswordSecure((prev) => !prev)}
     secureTextEntry={isConfirmPasswordSecure}
     />

}

     {
      !isSignUp &&
     <View style={{flexDirection:'row-reverse',marginEnd:10}}>
      {!isForgot &&
    <Pressable onPress={() => {
      resetFields();
      setForgot((prev) => !prev);
    }}>
      
      <Text  style={styles.forgotText}>
      Forgot Password?
      </Text>
    </Pressable>
}

     </View> 
}


    <AuthButton authButton={isForgot ? "Submit" : (!isSignUp ? "Login" : "SignUp")}
    onPress={handleSubmit}
    disabled={isLoading}
    />
{error ? <Text style={{ color: "#F83758" }}>{error}</Text> : null}

{ !isForgot &&
<View>
    <Text style={[styles.continue,{color:theme.text}]}>
      - Or Continue with -
    </Text>

    <AuthLogo/>

    <View style={styles.createAnAccount}>
      <Text style={[styles.createText,{color:theme.text}]}>
        { isSignUp ? "I Already Have an Account" :"Create An Account"}
      </Text>
      <Pressable onPress={()=> {
      resetFields();
      setForgot(false);
      setSignUp(!isSignUp);
      }}>
        <Text style={styles.signUp}>
          {isSignUp ? "Login" : "SignUp"}
        </Text>
      </Pressable>
    </View>
    </View>
}
     
     </ScrollView>
  );
};


const styles = StyleSheet.create({

    container:{
        flexGrow:1,
        padding:moderateScale(16),
        
    },

    welcomeBack:{
        
        fontWeight:'bold',
        fontSize:moderateScale(36),
        fontFamily: 'Montserrat-Regular',
        marginBottom:moderateScale(9)
       
    },

    forgotText:{
       fontFamily:'Montserrat-Regular',
      fontSize:12,
      fontWeight:400,
      marginTop:9,
      color:'#F83758',
      },
      continue:{

         fontSize:moderateScale(12),
         fontFamily:'Montserrat-Regular',
         fontStyle:'normal',
         fontWeight:'500',
         flexDirection:'row',
         alignSelf:'center',
         marginBottom:20
      },
      resetText:{
        fontFamily:'Montserrat-Regular',
        flexDirection:'row',
        marginTop:26,
        marginStart:18
      },
      createAnAccount:{
        
        flexDirection:'row',
        alignSelf:'center'
       
      },
      createText:{
           fontWeight:'semibold',
            marginEnd:5,
            fontFamily:'Montserrat-Regular'
      },
      signUp:{
        fontWeight:"bold",
         fontFamily:'Montserrat-Regular',
         color:'#F83758'
      }

   })

export default AuthScreen;
