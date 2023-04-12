import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Character } from "../models";

const DUMMY_FIGHTERS = [
  {
    _id: "5cd99d4bde30eff6ebccfbe6",
    height: "6'6\"",
    race: "Human",
    gender: "Male",
    birth: "March 1 ,2931",
    spouse: "Arwen",
    death: "FO 120",
    realm: "Arnor, Gondor",
    hair: "Dark",
    name: "Aragorn II Elessar",
    wikiUrl: "http://lotr.wikia.com//wiki/Aragorn_II_Elessar",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Andúril",
      value: 50,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Army of the Dead",
      value: 200,
      isSpecial: true,
    },
    health: 500,
  },
  {
    _id: "5cd99d4bde30eff6ebccfc07",
    height: "5'10\"",
    race: "Elf",
    gender: "Female",
    birth: "TA 241",
    spouse: "Aragorn II Elessar",
    death: "FO 121",
    realm: "Rivendell",
    hair: "Black",
    name: "Arwen",
    wikiUrl: "http://lotr.wikia.com//wiki/Arwen",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Hadhafang",
      value: 35,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Flood",
      value: 140,
      isSpecial: true,
    },
    health: 280,
  },
  {
    _id: "5cd99d4bde30eff6ebccfc15",
    height: "3'6\"",
    race: "Hobbit",
    gender: "Male",
    birth: "22 September ,TA 2968",
    spouse: "",
    death: "Unknown (Last sighting ,September 29 ,3021,) (,SR 1421,)",
    realm: "The Shire",
    hair: "Brown",
    name: "Frodo Baggins",
    wikiUrl: "http://lotr.wikia.com//wiki/Frodo_Baggins",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Sting",
      value: 30,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Invisibilty",
      value: 130,
      isSpecial: true,
    },
    health: 220,
  },
  {
    _id: "5cd99d4bde30eff6ebccfc1b",
    height: "4'6\"",
    race: "Dwarf",
    gender: "Male",
    birth: "TA 2763",
    spouse: "",
    death: "TA 2994",
    realm: "Erebor",
    hair: "White",
    name: "Balin",
    wikiUrl: "http://lotr.wikia.com//wiki/Balin",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Balin's Axe",
      value: 30,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Dwarven Power",
      value: 25,
      isSpecial: true,
    },
    health: 260,
  },
  {
    _id: "5cd99d4bde30eff6ebccfc37",
    height: "4'5\"",
    race: "Dwarf",
    gender: "Male",
    birth: "TA 2814",
    spouse: "",
    death: "UnknownFourth Age",
    realm: "Blue Mountains",
    hair: "Black/ Grey (film)",
    name: "Bifur",
    wikiUrl: "http://lotr.wikia.com//wiki/Bifur",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Boar spear",
      value: 25,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Dwarven Power",
      value: 25,
      isSpecial: true,
    },
    health: 250,
  },
];

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
