import {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { firebase, auth, db } from '../services/firebase'

interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: UserProps | undefined;
  signIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserProps | undefined>(undefined)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");          
        } 

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      } else {
        setUser(undefined)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(
    async () => {
      const provider = new firebase.auth.GoogleAuthProvider()

      const result = await auth.signInWithPopup(provider)

      if (result.user) {
        const { uid, displayName, photoURL } = result.user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");          
        } 

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{user, signIn}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};