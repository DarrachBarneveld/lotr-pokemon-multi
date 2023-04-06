import { FC } from "react";
import image from "../assets/images/characters/aragorn.webp";
import { Attack, Character } from "../models";

interface CardProps {
  character: Character;
  setAttackingCharacter: (name: string, attack: Attack) => void;
  active: boolean;
}

const Card: FC<CardProps> = ({ setAttackingCharacter, character, active }) => {
  return (
    <div className="flex flex-col items-center text-sm p-3  bg-slate-100 w-48 shadow-2xl rounded-xl">
      <div className="flex justify-between w-full text-bold text-sm font-extrabold tracking-wide">
        <h3>{character.name}</h3>
        <h3>{character.health}</h3>
      </div>
      <div className="w-full aspect-square bg-slate-400 rounded-lg overflow-hidden">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <button
        disabled={!active}
        onClick={() =>
          setAttackingCharacter(character.name, character.mainAttack)
        }
        className="flex justify-between w-full py-1 border-b font-bold border-slate-800   hover:bg-yellow-300 hover:disabled:bg-inherit hover:disabled:cursor-not-allowed"
      >
        <h3>{character.mainAttack.name}</h3>
        <h3>{character.mainAttack.value}</h3>
      </button>
      <button
        disabled={!active}
        onClick={() =>
          setAttackingCharacter(character.name, character.specialAttack)
        }
        className="flex justify-between w-full py-1 border-b font-bold border-slate-800  hover:bg-yellow-300 hover:disabled:bg-inherit hover:disabled:cursor-not-allowed"
      >
        <h3>{character.specialAttack.name}</h3>
        <h3>{character.specialAttack.value}</h3>
      </button>
    </div>
  );
};

export default Card;
