import AsyncStorage from "@react-native-async-storage/async-storage";
/*
what is JSON.stringify?=>It converts JavaScript value → String

What is JSON.parse() ? =>It converts String → Original JavaScript value
*/


const IS_LOGGED_IN = "IS_LOGGED_IN";
const HAS_LOGGED_IN_BEFORE = "HAS_LOGGED_IN_BEFORE";



export const saveLoginStatus = async(value:boolean) =>{
    await AsyncStorage.setItem(IS_LOGGED_IN,JSON.stringify(value));// AsyncStorage store only string
   // await saveLoginStatus(true); convert into =>IS_LOGGED_IN → "true"


};

export const getLoginStatus = async():Promise<boolean> =>{
    const value  = await AsyncStorage.getItem(IS_LOGGED_IN);
    return value ? JSON.parse(value) : false;
};


export const clearLoginStatus =  async () =>{
    await AsyncStorage.removeItem(IS_LOGGED_IN);
};



export const setHasLoggedInBefore = async (value: boolean) => {
  await AsyncStorage.setItem(HAS_LOGGED_IN_BEFORE, JSON.stringify(value));
};

export const getHasLoggedInBefore = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(HAS_LOGGED_IN_BEFORE);
  return value ? JSON.parse(value) : false;
};