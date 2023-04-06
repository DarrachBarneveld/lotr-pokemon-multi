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

import imageData from "../assets/data/images.json";

import { AnimatePresence, motion } from "framer-motion";
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
    useState<AttackingCharacter>({
      name: fighters[0].name,
      attack: fighters[0].mainAttack,
    });
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

    attackingCharacter.attack.disabledTurns =
      attackingCharacter.attack.disabledFor;

    console.log(attackingCharacter.attack);
  }

  function handleSelectedFighter(character: Character) {
    setChosenAttacker(character);
    setAttackingCharacter({
      name: character.name,
      attack: character.mainAttack,
    });
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

  return (
    <div className="flex flex-col h-full flex-1 justify-between items-center rounded-lg p-5">
      <div className="flex flex-wrap gap-2">
        {enemyFighters.length > 0 &&
          enemyFighters.map((char, index) => (
            <EnemyCard
              key={index}
              character={char}
              setTargetCharacter={handleTargetCharacter}
              active={active}
            />
          ))}
      </div>
      <div className="flex justify-center items-center space-x-10">
        <button
          onClick={() => handleAttackingCharacter(chosenAttacker.mainAttack)}
          className={`p-4 rounded-full bg-slate-50 bg-opacity-50 border-4 border-slate-200 shadow-xl h-fit hover:bg-amber-300 ${
            attackingCharacter?.attack === chosenAttacker.mainAttack &&
            "bg-amber-300 bg-opacity-100"
          }`}
        >
          <SwordIcon id="2" used={mainPower} stroke="black" />
        </button>
        {chosenAttacker && <FighterCard character={chosenAttacker} />}
        <button
          onClick={() => handleAttackingCharacter(chosenAttacker.specialAttack)}
          className={`p-4 rounded-full bg-slate-50 bg-opacity-50 border-4 border-slate-200 shadow-xl h-fit hover:bg-amber-300 ${
            attackingCharacter?.attack === chosenAttacker.specialAttack &&
            "bg-amber-300 bg-opacity-100"
          }`}
        >
          <SpecialPowerIcon id="3" used={specialPower} stroke="black" />
        </button>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-20 flex justify-between bg-slate-900 items-center p-2 w-full text-2xl text-white rounded-lg shadow-2xl">
        <AnimatePresence mode="wait">
          {!attackingCharacter && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute -top-8 z-10 left-0 p-1 bg-red-700 w-full text-slate-50 text-xl rounded-t-2xl"
            >
              <h4>Select Attack</h4>
            </motion.div>
          )}
        </AnimatePresence>
        <div className=" flex w-1/2">
          {fighters.map((fighter) => {
            const data = imageData.find((item) => item.name === fighter.name)!;

            return (
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageUrl}
                className="w-1/5 border-4 aspect-square object-cover border-amber-300 rounded-full hover:cursor-pointer"
                onClick={() => handleSelectedFighter(fighter)}
              />
            );
          })}
        </div>

        <div className="text-lg flex w-1/2 rounded-xl border bg-slate-100 text-slate-900 font-semibold">
          <div className="flex flex-col flex-1 p-2 gap-2">
            <div className="flex justify-between ">
              <h3 className="text-xl text-left">{chosenAttacker?.name}</h3>
              <HeartIcon id="1" percentage={percentage} stroke="black">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {chosenAttacker.health}
                </span>
              </HeartIcon>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex flex-col">
                <h5 className="underline">Race</h5>
                <span>{chosenAttacker.race}</span>
              </div>
              <div className="flex flex-col">
                <h5 className="underline">Height</h5>
                <span>{chosenAttacker?.height}</span>
              </div>
              <div className="flex flex-col">
                <h5 className="underline">Realm</h5>
                <span>{chosenAttacker?.realm}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-2 space-y-2">
            <div className="flex justify-between">
              <h1>{chosenAttacker.mainAttack.name}</h1>
              <h1 className="flex font-extrabold text-red-900">
                {chosenAttacker.mainAttack.value}
                <span className="h-6">
                  <ExplosionIcon />
                </span>
              </h1>
            </div>
            <ProgressBar reverseWidth={mainPower} color="bg-blue-600" />
            <div className="flex justify-between">
              <h1>{chosenAttacker.specialAttack.name}</h1>
              <h1 className="flex font-extrabold text-red-900">
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
  );
};

export default Arena;

{
  /* <div className="flex space-x-2">
<div className="flex rounded-2xl p-4">
  <button className="p-4 rounded-full bg-slate-50 bg-opacity-40 border-4 border-slate-200 shadow-xl">
    <SwordIcon id="2" used={mainPower} stroke="black" />
  </button>
  <button className="p-4 rounded-full bg-slate-50 bg-opacity-40 border-4 border-slate-200 shadow-xl">
    <SpecialPowerIcon id="3" used={specialPower} stroke="black" />
  </button>
</div>
</div> */
}
