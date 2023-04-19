import React, { createContext, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.confige';

export const AuthContext = createContext(null);

const auth = getAuth(app)

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const createUser = (email , password) => {
        return createUserWithEmailAndPassword (auth, email, password);
    }


    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    {
      const signInWithGoogle = () =>{
        signInWithPopup(auth, googleAuthProvider)
      }
    }

    const authInfo = {
        user,
        createUser,
        signIn,
        
        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;