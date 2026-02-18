import auth from "@react-native-firebase/auth";

export const firebaseAuthDataSource ={
    login: async(email:string,password:string) => {
        return await auth().signInWithEmailAndPassword(email,password);

    },
    signup: async(email:string , password:string)=>{
        return await auth().createUserWithEmailAndPassword(email,password);
    },

    logout:async()=>{
        return await auth().signOut();
    },

    getCurrentUser:()=>{
        return auth().currentUser;
    }

}