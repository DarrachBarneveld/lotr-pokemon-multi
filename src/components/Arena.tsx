import { FC, useContext, useEffect, useState } from "react";
import { socket } from "../config/socket";
import { ArenaContext } from "../context/ArenaContext";
import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "../helpers/gamingFunction";
import { Attack, AttackingCharacter, Character, IRoom } from "../models";
import EnemyCard from "./EnemyCard";
import FighterCard from "./FighterCard";
import {
  ExplosionIcon,
  HeartIcon,
  SpecialPowerIcon,
  SwordIcon,
} from "./ui/icons/CardIcons";

import deadImage from "../assets/deadoverlay.png";

import imageData from "../assets/data/images.json";

import { motion } from "framer-motion";
import ProgressBar from "./ui/ProgressBar";

interface ArenaProps {
  room: IRoom;
  active: boolean;
}

type AttackingHitData = {
  attackingCharacter: AttackingCharacter;
  targetCharacter: Character;
};

const Arena: FC<ArenaProps> = ({ room, active }) => {
  const { fighters, enemyFighters } = useContext(ArenaContext);
  const [attackingCharacter, setAttackingCharacter] =
    useState<AttackingCharacter>();
  const [chosenAttacker, setChosenAttacker] = useState<Character>(fighters[0]);

  const aliveFighters = fighters.filter((char) => char.health > 0);
  const aliveEnemy = enemyFighters.filter((char) => char.health > 0);

  useEffect(() => {
    if (aliveFighters.length === 0) {
      socket.emit("loss");
      socket.emit("game_over", room);
    }

    if (aliveEnemy.length === 0) {
      socket.emit("win");
      socket.emit("game_over", room);
    }
  }, [aliveFighters, aliveEnemy]);

  function handleAttackingCharacter(attack: Attack) {
    const attackingModel = {
      name: chosenAttacker.name,
      attack,
    };
    setAttackingCharacter(attackingModel);
  }

  function handleTargetCharacter(targetCharacter: Character) {
    socket.emit("attack", { attackingCharacter, targetCharacter, room });
    socket.emit("increment_turn", room);

    attackingCharacter!.attack.disabledTurns =
      attackingCharacter!.attack.disabledFor;

    setAttackingCharacter(undefined);
  }

  function handleSelectedFighter(character: Character) {
    setChosenAttacker(character);
    setAttackingCharacter(undefined);
  }

  useEffect(() => {
    socket.on("attacking_hit", (data: AttackingHitData) => {
      const message = `${data.attackingCharacter.name} hits ${data.targetCharacter.name} for ${data.attackingCharacter.attack.value}`;
      alert(message);

      const allCharacters = [...fighters, ...enemyFighters];

      const fighter = allCharacters.find(
        (fighter) => fighter.name === data.targetCharacter?.name
      )!;

      if (fighter) {
        fighter.health = fighter.health - data.attackingCharacter.attack.value;
      }
    });

    socket.on("update_turn", (data) => {
      fighters.forEach((char) => {
        if (char.mainAttack.disabledTurns > 0) {
          char.mainAttack.disabledTurns -= 1;
        }
        if (char.specialAttack.disabledTurns > 0) {
          char.specialAttack.disabledTurns -= 1;
        }
      });
    });

    socket.on("winning_alert", () => alert("YOU WON"));
    socket.on("losing_alert", () => alert("YOU LOST"));
  }, [socket]);

  const percentage = calculateCharacterHealth(chosenAttacker);

  const { mainPower, specialPower } =
    calculateAttackTimeRemaining(chosenAttacker);

  const isMainTrue =
    chosenAttacker.mainAttack.name === attackingCharacter?.attack.name;

  const isSpecialTrue =
    chosenAttacker.specialAttack.name === attackingCharacter?.attack.name;

  return (
    <div className="flex flex-col w-full flex-1 justify-between items-center">
      <div className="flex w-full overflow-scroll md:justify-center">
        <div className="flex w-fit gap-2">
          {enemyFighters.length > 0 &&
            enemyFighters.map((char, index) => (
              <EnemyCard
                key={index}
                character={char}
                setTargetCharacter={handleTargetCharacter}
                active={active}
                attackingCharacter={attackingCharacter}
              />
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center space-x-3">
        <button
          disabled={
            chosenAttacker.mainAttack.disabledTurns > 0 ||
            chosenAttacker.health <= 0
          }
          onClick={() => handleAttackingCharacter(chosenAttacker.mainAttack)}
          className={`action-btn ${
            isMainTrue
              ? "bg-amber-300 bg-opacity-100"
              : "bg-slate-50 bg-opacity-75"
          }`}
        >
          <SwordIcon id="2" used={mainPower} stroke="black" />
        </button>
        {chosenAttacker && <FighterCard character={chosenAttacker} />}
        <button
          disabled={
            chosenAttacker.specialAttack.disabledTurns > 0 ||
            chosenAttacker.health <= 0
          }
          onClick={() => handleAttackingCharacter(chosenAttacker.specialAttack)}
          className={`action-btn ${
            isSpecialTrue
              ? "bg-amber-300 bg-opacity-100"
              : "bg-slate-50 bg-opacity-75"
          }`}
        >
          <SpecialPowerIcon id="3" used={specialPower} stroke="black" />
        </button>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-20 flex flex-col space-y-2 justify-between bg-slate-900 items-center p-2 w-fit text-2xl text-white rounded-2xl shadow-2xl">
        <div className="flex">
          {fighters.map((fighter) => {
            const data = imageData.find((item) => item.name === fighter.name)!;

            return (
              <div className="relative w-1/5 max-w-[100px] 2xl:max-w-[150px] border-4 aspect-square object-cover border-amber-300 rounded-full hover:cursor-pointer overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={data.imageUrl}
                  className="h-full w-full object-cover"
                  onClick={() => handleSelectedFighter(fighter)}
                />
                {fighter.health <= 0 && (
                  <div className="absolute top-0 bottom-0 z-40 flex justify-center items-center w-full h-full">
                    <img src={deadImage} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ATTACK INFORMATION */}
        <div className="flex flex-col w-full justify-between flex-1  text-xs lg:text-sm bg-slate-100 text-slate-900 font-semibold rounded-xl">
          <div className="flex justify-between p-1">
            <h3 className=" text-base lg:text-lg">{chosenAttacker?.name}</h3>
            <div className="h-10 aspect-square">
              <HeartIcon id="1" percentage={percentage} stroke="black">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {chosenAttacker.health}
                </span>
              </HeartIcon>
            </div>
          </div>
          <div className="flex w-full space-x-2 text-left">
            <div
              className={`flex flex-col space-y-1 flex-1 p-1 rounded-lg ${
                isMainTrue && "bg-amber-300"
              }`}
            >
              <div className="flex justify-between">
                <h1>{chosenAttacker.mainAttack.name}</h1>
                <h1 className="flex items-center font-extrabold text-red-900">
                  {chosenAttacker.mainAttack.value}
                  <span className="h-6">
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
                <h1>{chosenAttacker.specialAttack.name}</h1>
                <h1 className="flex items-center font-extrabold text-red-900">
                  {chosenAttacker.specialAttack.value}
                  <span className="h-6">
                    <ExplosionIcon />
                  </span>
                </h1>
              </div>
              <ProgressBar reverseWidth={specialPower} color="bg-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
{
  /* <button
disabled={chosenAttacker.mainAttack.disabledTurns > 0}
onClick={() => handleAttackingCharacter(chosenAttacker.mainAttack)}
className={`w-14 lg:w-24 p-2 lg:p-4 rounded-full border-2 border-slate-200 shadow-2xl hover:bg-amber-300 hover:disabled:cursor-not-allowed ${
  isMainTrue
    ? "bg-amber-300 bg-opacity-100"
    : "bg-slate-50 bg-opacity-50"
}`}
>
<SwordIcon id="2" used={mainPower} stroke="black" />
</button>
{chosenAttacker && <FighterCard character={chosenAttacker} />}
<button
disabled={chosenAttacker.specialAttack.disabledTurns > 0}
onClick={() => handleAttackingCharacter(chosenAttacker.specialAttack)}
className={`w-14 lg:w-24 p-2 lg:p-4 rounded-full border-2 border-slate-200 shadow-xl hover:bg-amber-300 hover:disabled:cursor-not-allowed ${
  isSpecialTrue
    ? "bg-amber-300 bg-opacity-100"
    : "bg-slate-50 bg-opacity-50"
}`}
>
<SpecialPowerIcon id="3" used={specialPower} stroke="black" />
</button> */
}
