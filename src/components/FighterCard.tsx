import { FC } from "react";
import image from "../assets/images/characters/aragorn.webp";
import { Character } from "../models";
import imageData from "../assets/data/images.json";

interface FighterCard {
  character: Character;
}

const FighterCard: FC<FighterCard> = ({ character }) => {
  const data = imageData.find((item) => item.name === character.name)!;

  return (
    <div className="flex flex-col items-center text-sm p-3  bg-slate-100 w-48 shadow-2xl rounded-xl">
      <div className="flex justify-between w-full text-bold text-sm font-extrabold tracking-wide">
        <h3 className="text-left">{character.name}</h3>
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
    </div>
  );
};

export default FighterCard;
