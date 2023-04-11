import { FC } from "react";
import { Character } from "../models";
import imageData from "../assets/data/images.json";

import deadImage from "../assets/deadoverlay.png";

interface FighterCard {
  character: Character;
}

const FighterCard: FC<FighterCard> = ({ character }) => {
  const data = imageData.find((item) => item.name === character.name)!;

  const health = character.health <= 0;

  return (
    <div className="group relative flex flex-col items-center text-xs border-2 border-amber-300 overflow-hidden bg-slate-100 w-32 md:w-36 lg:w-40 xl:w-44 shadow-2xl rounded-xl 2xl:text-sm">
      {health && (
        <div className="absolute z-40 flex justify-center items-center w-full h-full">
          <img src={deadImage} />
        </div>
      )}
      <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-50% to-slate-900" />
      <div className="w-full aspect-[2/3] bg-slate-400 rounded-lg overflow-hidden">
        <img src={data.imageUrl} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 p-2 text-slate-50 flex justify-between w-full text-bold text-base font-extrabold tracking-wide">
        <h3 className="text-left">{character.name}</h3>
      </div>
    </div>
  );
};

export default FighterCard;
