import { Pressable, View } from "react-native";
import { StyleSheet ,Image} from "react-native";
import { moderateScale } from "react-native-size-matters";

const logos =[
   { id:1,src:require('../../assets/AuthLogo/Google.png'), onPress: ()=> console.log('google')},

    { id:2,src:require('../../assets/AuthLogo/apple.png'), onPress: ()=> console.log('facebook')},

     { id:3,src:require('../../assets/AuthLogo/Facebook.png'), onPress: ()=> console.log('apple')},
] 

const AuthLogo  = () => {
    return(
     <View style ={styles.container}>
          
        {logos.map(item=>(
            <Pressable key = {item.id} onPress={item.onPress}>

            <Image style ={styles.logo} source={item.src}/>

            </Pressable>

        ))}
        
     
     </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        marginBottom:moderateScale(28)
      
    },
    logo:{
        marginHorizontal:moderateScale(10),
        width:moderateScale(54),
        height:moderateScale(54)
    }

})

export default AuthLogo;