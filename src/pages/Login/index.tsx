import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataContext } from '../../context/DataContext';

import { styles } from './styles';

const Login = ({navigation}) => {

const {armazenaDadosUsuario} = useContext(DataContext);
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

const handleLogin = async () => {
  console.log(`Email: ${email} - Senha: ${senha}`)
  var tokenJwt:any = null;

  try {
    const retorno = await AxiosInstance.post('/auth/login', {
      email:email,
      password:senha
    });
    
    if(retorno.status === 200){
      tokenJwt = retorno.data;
      armazenaDadosUsuario(tokenJwt["jwt-token"]);
      navigation.navigate('BottomNavigatorScreen');

      console.log('Retorno: ' + JSON.stringify(retorno.data));
    }else{
      console.log('Erro ao realizar a autenticação');  
    }

  } catch (error) {
    console.log('Erro ao realizar a autenticação - ' 
    + JSON.stringify(error));
    
  }

}

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Bem-Vindo</Text>
      </View>

      <View style={styles.conteudo}>

        <TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} value={email}/>
        <TextInput style={styles.input} placeholder='Senha' secureTextEntry={true} onChangeText={setSenha} value={senha}/>

      </View>

      <View style={styles.rodape}>
          <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
            <Text style={styles.textoBotao}>Login</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );
};
export default Login;