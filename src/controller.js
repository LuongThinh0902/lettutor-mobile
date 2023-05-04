
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login.js';
import SignUp from './screens/signup.js'
import TeacherList from './screens/teacherList.js';
import Tutor from "./screens/tutor.js";
import { useSelector } from 'react-redux';
import ForgotPassword from './screens/forgotPassword.js';
import Menu from "./screens/menu.js"
import Schedule from "./screens/schedule.js"
const Stack = createNativeStackNavigator();

export default function Controller() {
  const { isLogin } = useSelector (state=>{
    return { isLogin: state.user.isLogin}
  })
  console.log(isLogin)
  return (
    <>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="login"
                screenOptions={{ headerShown: false }}
            >
              {isLogin?
              <>
                <Stack.Screen name="schedule" component={Schedule} />
                <Stack.Screen name="teacherList" component={TeacherList} />
                <Stack.Screen name="tutor" component={Tutor} />
                <Stack.Screen name="menu" component={Menu} />

              </>
              :
              <>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signUp" component={SignUp} />
                <Stack.Screen name="forgotPassword" component={ForgotPassword} />
              </>
              }
               
            </Stack.Navigator>
        </NavigationContainer>
    </>
  );
}