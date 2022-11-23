import React, {useContext} from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataProvider } from "./context/DataContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeEditoras from './pages/HomeEditoras';
import HomeEditora from "./pages/HomeEditora";
// import { DataContext } from '../../context/DataContext';

// const {dadosUsuario} = useContext(DataContext);
const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
    return (
        <TabBottomNavigation.Navigator 
        screenOptions={{
          headerShown:true,
          tabBarStyle:{backgroundColor: '#ffcc00'},
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'blue'
        }}
      >
        <TabBottomNavigation.Screen name="HomeTabScreen" component={Home}
        options={{
          title:'Home',
          tabBarIcon: () => (<Ionicons name='home' color='#000' size={24} />)
        }}
      />
        <TabBottomNavigation.Screen name="HomeEditorasTabScreen" component={HomeEditoras} 
        options={{
            title:'Editoras',
            tabBarIcon: () => (<Ionicons name='library' color='#000' size={24} />)
          }}/>
      </TabBottomNavigation.Navigator>
    );
  }

const Stack = createNativeStackNavigator();
const App = () => {
    return(
        <DataProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false/*, 
                                headerStyle:{backgroundColor:"green"}, title:"Isso, Isso, Muito bom!"*/}}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="BottomNavigatorScreen" component={BottomNavigator} />
                    <Stack.Screen name="HomeEditora" component={HomeEditora} />
                </Stack.Navigator>
            </NavigationContainer>
        </DataProvider>
    )
}
export default App;