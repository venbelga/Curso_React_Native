import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const { signUp, loadingAuth } = authContext;
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp() {
        if (nome === '' || email === '' || password === '') {
            return;
        }
        
        signUp(email, password, nome);
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <AreaInput>
                    <Input placeholder="Nome" value={nome} onChangeText={setNome} />
                </AreaInput>
                <AreaInput>
                    <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
                </AreaInput>
                <AreaInput>
                    <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry={true} />
                </AreaInput>
                <SubmitButton onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SubmitButton>
            </Container>
        </Background>
    )
}