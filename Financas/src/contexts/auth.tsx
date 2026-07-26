import React, { createContext, useState } from "react";
import api from "../services/api";
import {useNavigation} from "@react-navigation/native";

type User = {
    name: string;
    password: string;
    email: string;
};

type AuthContextData = {
    user: User | null;
    signUp: (email: string, password: string, nome: string) => Promise<void>;
    loadingAuth: boolean;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export default function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const navigation = useNavigation();
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp(email: string, password: string, nome: string) {
        setLoadingAuth(true);
        try{
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: password
            });

            setLoadingAuth(false);
            navigation.goBack();
        }catch (error) {
            console.log('Erro ao cadastrar', error);
            setLoadingAuth(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
