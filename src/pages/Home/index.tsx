import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Button
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
    </TouchableOpacity>
  );

const Home = ({navigation}) => {

    const {dadosUsuario} = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getAllEditoras();
    },[]);

    const navigateToEditoraHome = (id:any) => {
      setSelectedId(id);
      navigation.navigate('HomeEditora', 
      { editoraId:id });
    }
    const getAllEditoras = async () => {
        AxiosInstance.get(
            '/editoras',
            {headers: {"Authorization": `Bearer ${dadosUsuario?.token}`}}
        ).then(resultado => {
            console.log('Dados das Editoras: ' + JSON.stringify(resultado.data));
            setDadosEditora(resultado.data);            
        }).catch((error) => {
            console.log('Ocorreu um erro ao recuperar os dados das Editoras: ' + JSON.stringify(error));
            
        })
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.codigoEditora === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.codigoEditora === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => navigateToEditoraHome(item.codigoEditora)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
    };

    return(
        <View style={styles.container}>
            <Text>{'Home'}</Text>
            <Text>Bem-vindo, {dadosUsuario?.nome}</Text>
             <FlatList
                data={dadosEditora}
                renderItem={renderItem}
                keyExtractor={(item) => item.codigoEditora}
                extraData={selectedId}
                horizontal={true}
            />
            <Button
            title="Return to Login"
            onPress={() => navigation.navigate('Login')}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      marginHorizontal: 8,
      padding:10,
      width:120,
      height:120,
      justifyContent:'center',
    },
    title: {
      fontSize: 32,
    },
  });

export default Home;