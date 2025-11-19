import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { FormUsers } from './src/FormUsers';
import { auth } from './src/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          uid: user.uid,
          email: user.email
        });

        setLoading(false);
        return;
      }

      setLoading(false);
      setAuthUser(null);
    })
  }, []);

  async function handleCreateUser() {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      setAuthUser({
        uid: user.user.uid,
        email: user.user.email
      })
    }).catch((error) => {
      Alert.alert('Erro ao fazer login: ' + error);
    });
  }

  if (authUser) {
    return (
      <View style={styles.container}>
        <FormUsers />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading && (<Text style={{fontSize: 20, marginLeft: 8, color: '#000', marginBottom: 8}}>Carregando informações...</Text>)}

      <Text style={{ marginLeft: 8, fontSize: 18, color: '#000' }}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={{ marginLeft: 8, fontSize: 18, color: '#000' }}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={[styles.button, { marginBottom: 8 }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginBottom: 8 }]} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  input: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 14,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000',
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  }
})