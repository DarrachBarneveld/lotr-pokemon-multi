import { FC } from "react";
import { Character } from "../models";
import imageData from "../assets/data/images.json";

import deadImage from "../assets/deadoverlay.png";
import ProgressBar from "./ui/ProgressBar";
import { ExplosionIcon } from "./ui/icons/CardIcons";
import { calculateAttackTimeRemaining } from "../helpers/gamingFunction";

interface FighterCard {
  character: Character;
  isMainTrue: boolean;
  isSpecialTrue: boolean;
}

const FighterCard: FC<FighterCard> = ({
  character,
  isMainTrue,
  isSpecialTrue,
}) => {
  const data = imageData.find((item) => item.name === character.name)!;

  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  let className;

  switch (character.race) {
    case "Maiar":
      className =
        "border-yellow-400 bg-gradient-to-r from-yellow-300 to-yellow-200";
      break;

    case "Elf":
    case "Ent":
      className =
        "border-green-700 bg-gradient-to-r from-green-300 to-green-200";
      break;
    case "Human":
    case "Hobbit":
      className = "border-blue-700 bg-gradient-to-r from-blue-300 to-blue-200";
      break;
    case "Dwarf":
      className =
        "border-stone-700 bg-gradient-to-r from-stone-300 to-stone-200";
      break;
    default:
      className = "border-red-700 bg-gradient-to-r from-red-400 to-red-300";
      break;
  }

  return (
    <div
      id={character._id}
      className={`group relative flex flex-col items-center w-48 text-xs font-semibold border-4 ${className} shadow-2xl rounded-xl overflow-hidden  lg:w-56 xl:w-60 lg:text-sm`}
    >
      {character.health <= 0 && (
        <div className="absolute z-40 flex justify-center items-center w-full h-full">
          <img src={deadImage} />
        </div>
      )}
      <div className="w-full aspect-square rounded-t-lg overflow-hidden">
        <img src={data.imageUrl} className="w-full h-full object-cover" />
      </div>
      <div className="relative w-full pt-2">
        <span className="absolute text-sm md:text-base -top-6 left-2 bg-slate-900 text-slate-50 px-2 py-1 rounded-md">
          {character.race}
        </span>
        <div
          className={`flex flex-col flex-1 p-1 rounded-lg ${
            isMainTrue && "bg-amber-300"
          }`}
        >
          <div className="flex justify-between">
            <h1>{character.mainAttack.name}</h1>
            <h1 className="flex items-center font-extrabold text-red-900">
              {character.mainAttack.value}
              <span className="h-4">
                <ExplosionIcon />
              </span>
            </h1>
          </div>
          <ProgressBar reverseWidth={mainPower} color="bg-blue-600" />
        </div>
        <div
          className={`flex flex-col space-y-1 flex-1 p-1 rounded-lg ${
            isSpecialTrue && "bg-amber-300"
          }`}
        >
          <div className="flex justify-between ">
            <h1>{character.specialAttack.name}</h1>
            <h1 className="flex items-center font-extrabold text-red-900">
              {character.specialAttack.value}
              <span className="h-4">
                <ExplosionIcon />
              </span>
            </h1>
          </div>
          <ProgressBar reverseWidth={specialPower} color="bg-green-600" />
        </div>
      </div>
    </div>
  );
};

export default FighterCard;

// {health && (
//   <div className="absolute z-40 flex justify-center items-center w-full h-full">
//     <img src={deadImage} />
//   </div>
// )}

{
  /* <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-50% to-slate-900" /> */
}

{
  /* <div className="absolute bottom-0 p-2 text-slate-50 flex justify-between w-full text-bold text-base font-extrabold tracking-wide">
<h3 className="text-left">{character.name}</h3>
</div> */
}
