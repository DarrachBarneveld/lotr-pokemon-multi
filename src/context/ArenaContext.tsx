import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Character } from "../models";

interface IArenaContext {
  fighters: Character[];
  enemyFighters: Character[];
  setFighters: Dispatch<SetStateAction<Character[]>>;
  setEnemyFighters: Dispatch<SetStateAction<Character[]>>;
}

const defaultState: IArenaContext = {
  fighters: [],
  enemyFighters: [],
  setFighters: () => {},
  setEnemyFighters: () => {},
};

export const ArenaContext = createContext<IArenaContext>(defaultState);

type Props = {
  children?: ReactNode;
};

export const ArenaContextProvider = ({ children }: Props) => {
  const [fighters, setFighters] = useState<Character[]>([]);
  const [enemyFighters, setEnemyFighters] = useState<Character[]>([]);

  const value = {
    fighters,
    setFighters,
    enemyFighters,
    setEnemyFighters,
  };

  return (
    <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>
  );
};

export default ArenaContextProvider;
