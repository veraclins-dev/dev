import { createContext } from 'react';

type UseIconContext = {
  sprite: string;
};

const IconContext = createContext<UseIconContext>({} as UseIconContext);

type IconProviderProps = {
  children: React.ReactNode;
  sprite: string;
};

const IconProvider = ({ children, sprite }: IconProviderProps) => {
  return (
    <IconContext.Provider value={{ sprite }}>{children}</IconContext.Provider>
  );
};

export { IconContext, IconProvider };
