import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const GRADIENT_COLORS = [
  "rgba(0,0,0,0.0)",
  "rgba(0,0,0,0.35)",
  "rgba(0,0,0,0.65)",
  "rgba(0,0,0,0.85)",
];

const GRADIENT_LOCATIONS = [0, 0.45, 0.75, 1];
const GRADIENT_START = { x: 0.5, y: 0 };
const GRADIENT_END = { x: 0.5, y: 1 };

type GetStartedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GetStarted"
>;

const GetStarted = () => {
  const navigation = useNavigation<GetStartedNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/onboardingImages/Get.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          locations={GRADIENT_LOCATIONS}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>You Want</Text>
            <Text style={styles.title}>Authentic, Here</Text>
            <Text style={styles.title}>You go!</Text>

            <Text style={styles.semiTitle}>
              Find it here, buy it now!
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.getStarted}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  content: {
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(36),
    minHeight: moderateScale(320),
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "Montserrat-Regular",
    color: "#FFFFFF",
    fontSize: moderateScale(34),
    textAlign: "center",
    fontWeight: "600",
  },

  semiTitle: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    fontSize: moderateScale(14),
    marginTop: moderateScale(14),
    marginBottom: moderateScale(24),
    fontWeight: "400",
    textAlign: "center",
  },

  button: {
    width: moderateScale(279),
    height: moderateScale(55),
    borderRadius: moderateScale(8),
    backgroundColor: "#F83758",
    justifyContent: "center",
    alignItems: "center",
   
  },

  getStarted: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    fontFamily: "Montserrat-Regular",
    color: "#FFFFFF",
  },
});

export default GetStarted;
