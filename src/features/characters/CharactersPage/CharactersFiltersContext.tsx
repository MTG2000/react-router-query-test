import { createContext, ReactNode, FC, useContext, useState } from 'react';

type StatusFilter = 'alive' | 'dead' | 'unknown';
type GenderFilter = 'male' | 'female' | 'genderless' | 'unknown';

interface ContextState {
  status: StatusFilter | undefined;
  gender: GenderFilter | undefined;
  setStatus: (value: this['status']) => void;
  setGender: (value: this['gender']) => void;
}

const Context = createContext<ContextState | null>(null);

export const CharactersFiltersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<ContextState['status']>();
  const [gender, setGender] = useState<ContextState['gender']>();

  return (
    <Context.Provider value={{ status, gender, setStatus, setGender }}>{children}</Context.Provider>
  );
};

export const useCharactersFilter = () => {
  const value = useContext(Context);
  if (!value) throw Error("Can't use context without provider");
  return value;
};
