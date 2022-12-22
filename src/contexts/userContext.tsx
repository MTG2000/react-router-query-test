import { auth } from '@/services/firebase/auth';
import { User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface State {
  user: User | null;
}

const Context = createContext<State | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

export const useAuthUser = () => {
  const res = useContext(Context);
  if (!res) throw new Error('No provider was found at parents');
  return res.user;
};
