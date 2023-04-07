import { FC } from "react";
import { Character } from "../models";
import imageData from "../assets/data/images.json";
import { ExplosionIcon, HeartIcon } from "./ui/icons/CardIcons";
import { calculateCharacterHealth } from "../helpers/gamingFunction";

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

  const percentage = calculateCharacterHealth(character);

  return (
    <button
      disabled={!active}
      onClick={() => setTargetCharacter(character)}
      className="group relative flex flex-col items-center text-xs border border-amber-300 overflow-hidden bg-slate-100 w-32 shadow-2xl rounded-xl 2xl:text-sm 2xl:w-44 hover:brightness-105 hover:disabled:cursor-not-allowed"
    >
      <div className="absolute hidden w-full h-full top-0 left-0 right-0 bottom-0 group-hover:flex">
        <div className="relative w-full h-full flex item-center justify-center">
          <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-red-500 opacity-30" />
          <div className="w-2/3">
            <ExplosionIcon />
          </div>
        </div>
      </div>
      <div className="w-full aspect-[2/3] bg-slate-400 rounded-lg overflow-hidden">
        <img src={data.imageUrl} className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 px-2 text-slate-50 flex justify-between w-full text-bold text-sm font-extrabold tracking-wide">
        <h3 className="text-left">{character.name.substring(0, 20)}</h3>
        <div className="h-12 w-12">
          <HeartIcon id={character.name} percentage={percentage} stroke="black">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {character.health}
            </span>
          </HeartIcon>
        </div>
      </div>
    </button>
  );
};

export default EnemyCard;
