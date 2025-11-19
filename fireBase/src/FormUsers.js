import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from './firebaseConnection';
import { doc, onSnapshot, collection, addDoc, updateDoc } from 'firebase/firestore';
import Users from './users';
import { signOut } from 'firebase/auth';

export function FormUsers() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cargo, setCargo] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState("");

    useEffect(() => {
        async function getDados() {
            const userRef = collection(db, "users");

            onSnapshot(userRef, (snapshot) => {
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        idade: doc.data().idade,
                        cargo: doc.data().cargo
                    });
                });
                setUsers(lista);
            });
        }

        getDados();
    }, []);

    async function handleRegister() {
        await addDoc(collection(db, 'users'), {
            nome: nome,
            idade: idade,
            cargo: cargo
        }).then(() => {
            console.log('Cadastrado com sucesso!');
            setNome('');
            setIdade('');
            setCargo('');
        }).catch((error) => {
            console.log('Erro ao cadastrar: ' + error);
        });
    }

    function handleToggle() {
        setShowForm(!showForm);
    }

    function editUser(data) {
        setNome(data.nome);
        setIdade(data.idade);
        setCargo(data.cargo);
        setIsEditing(data.id);
    }

    async function handleEditUser() {
        const docRef = doc(db, "users", isEditing);
        await updateDoc(docRef, {
            nome: nome,
            idade: idade,
            cargo: cargo
        }).then(() => {
            setNome('');
            setIdade('');
            setCargo('');
            setIsEditing("");
        });
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <View style={styles.container}>
            {showForm && (
                <View>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite seu nome...'
                        value={nome}
                        onChangeText={(text) => setNome(text)} />

                    <Text style={styles.label}>Idade</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite sua idade...'
                        value={idade}
                        onChangeText={(text) => setIdade(text)} />

                    <Text style={styles.label}>Cargo</Text>
                    <TextInput style={styles.input}
                        placeholder='Digite seu cargo...'
                        value={cargo}
                        onChangeText={(text) => setCargo(text)} />



                    {isEditing !== "" ? (
                        <TouchableOpacity style={styles.button} onPress={handleEditUser}>
                            <Text style={styles.buttonText}>Editar Usuário</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleToggle}>
                <Text style={{ textAlign: 'center', color: '#000' }}>
                    {showForm ? 'Esconder Formulário' : 'Mostrar Formulário'}
                </Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: '#000' }}>Usuario</Text>
            <FlatList
                style={styles.list}
                data={users}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Users data={item}
                    handleEdit={(item) => editUser(item)}
                />
                }
            />

            <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                <Text style={{color: '#fff'}}>Sair da conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        backgroundColor: '#000',
        marginLeft: 8,
        marginRight: 8,
    },
    buttonText: {
        padding: 8,
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8
    },
    label: {
        fontSize: 18,
        color: '#000',
        marginBottom: 4,
        marginLeft: 8
    },
    buttonLogout: {
        backgroundColor: 'red',
        alignSelf: 'flex-start',
        margin: 14,
        padding: 8,
        borderRadius: 4
    }
})