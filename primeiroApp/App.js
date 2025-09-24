import React,
{ useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [nome, setNome] = useState('Venancio');
  const [input, setInput] = useState('');
  const nomeInput = useRef(null);

  useEffect(() => {
    async function getStorage() {
      const nomeStorage = await AsyncStorage.getItem('nome');

      if (nomeStorage) {
        setNome(nomeStorage);
      }
    }

    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      await AsyncStorage.setItem('nome', nome);
    }

    saveStorage();
  }, [nome])

  function alteraNome() {
    setNome(input);
    setInput('');
  }

  const letrasNome = useMemo(() => {
    console.log('mudou');
    return nome.length;
  }, [nome]);

  function novoNome() {
    nomeInput.current.focus();
  }


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite seu nome"
        value={input}
        onChangeText={(texto) => setInput(texto)}
        ref={nomeInput}
      />

      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}>Alterar Nome</Text>
      </TouchableOpacity>

      <Text style={styles.texto}>{nome}</Text>

      <Text style={styles.texto}>Tem {letrasNome} letras</Text>

       <TouchableOpacity style={styles.btn} onPress={novoNome}>
        <Text style={styles.btnText}>Novo Nome</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  texto: {
    color: '#000',
    fontSize: 35
  },
  btn: {
    backgroundColor: '#222',
    alignItems: 'center',
    height: 40,
  },
  btnText: {
    color: '#FFF',
    fontSize: 15,
  }
});