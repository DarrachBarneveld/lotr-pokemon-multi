import { FC } from "react";
import { Character } from "../models";
import imageData from "../assets/data/images.json";

interface CardProps {
  character: Character;
  setTargetCharacter: (character: Character) => void;
  active: boolean;
}

const EnemyCard: FC<CardProps> = ({
  character,
  setTargetCharacter,
  active,
}) => {
  const data = imageData.find((item) => item.name === character.name)!;

  return (
    <button
      disabled={!active}
      onClick={() => setTargetCharacter(character)}
      className="flex flex-col items-center text-sm p-3  bg-slate-100 w-48 shadow-2xl rounded-xl hover:brightness-105 hover:disabled:cursor-not-allowed"
    >
      <div className="flex justify-between w-full text-bold text-sm font-extrabold tracking-wide">
        <h3>{character.name}</h3>
        <h3>{character.health}</h3>
      </div>
      <div className="w-full aspect-square bg-slate-400 rounded-lg overflow-hidden">
        <img src={data.imageUrl} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between w-full py-1 border-b font-bold border-slate-800">
        <h3>{character.mainAttack.name}</h3>
        <h3>{character.mainAttack.value}</h3>
      </div>
      <div className="flex justify-between w-full py-1 border-b font-bold border-slate-800">
        <h3>{character.specialAttack.name}</h3>
        <h3>{character.specialAttack.value}</h3>
      </div>
    </button>
  );
};

export default EnemyCard;
