import { FC, useContext, useEffect, useRef, useState } from "react";
import { socket } from "../config/socket";
import { ArenaContext } from "../context/ArenaContext";
import {
  animationTimer,
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "../helpers/gamingFunction";
import { Attack, AttackingCharacter, Character, IRoom } from "../models";
import EnemyCard from "./EnemyCard";
import FighterCard from "./FighterCard";
import {
  HeartIcon,
  ShieldIcon,
  SpecialPowerIcon,
  SwordIcon,
} from "./ui/icons/CardIcons";
import useSound from "use-sound";
import audio from "../assets/audio/fight.mp3";

import deadImage from "../assets/deadoverlay.png";

import imageData from "../assets/data/images.json";

import { motion } from "framer-motion";
import FightAnimation, { IAttackingAnimationProps } from "./FightAnimation";
import GameOver from "./GameOver";

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
  const [showModal, setShowModal] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(false);
  const defendingState = useRef(false);
  const enemyDefendingState = useRef(false);
  const animatedAttack = useRef<IAttackingAnimationProps>();

  const aliveFighters = fighters.filter((char) => char.health > 0);
  const aliveEnemy = enemyFighters.filter((char) => char.health > 0);
  const [hitSound] = useSound(audio);

  useEffect(() => {
    if (aliveFighters.length === 0) {
      socket.emit("loss");
      setGameOverModal(true);
    }

    if (aliveEnemy.length === 0) {
      socket.emit("win");
      setGameOverModal(true);
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

  function handleDefence() {
    socket.emit("defence", room);
    socket.emit("increment_turn", room);
    defendingState.current = true;
    setAttackingCharacter(undefined);
  }

  function handleSelectedFighter(character: Character) {
    setChosenAttacker(character);
    setAttackingCharacter(undefined);
  }

  async function animationTimerAsync() {
    setShowModal(true);
    hitSound();

    await animationTimer(1000);
    setShowModal(false);
  }

  useEffect(() => {
    socket.on("opponent_defence", () => {
      enemyDefendingState.current = true;
    });

    socket.on("attacking_hit", (data: AttackingHitData) => {
      const attackData: IAttackingAnimationProps = {
        attacker: data.attackingCharacter,
        target: data.targetCharacter,
      };

      animatedAttack.current = attackData;

      const allCharacters = [...fighters, ...enemyFighters];

      const fighter = allCharacters.find(
        (fighter) => fighter.name === data.targetCharacter?.name
      )!;

      if (fighter) {
        if (
          defendingState.current === true ||
          enemyDefendingState.current === true
        ) {
          fighter.health =
            fighter.health - data.attackingCharacter.attack.value / 2;

          defendingState.current = false;
          enemyDefendingState.current = false;
        } else {
          fighter.health =
            fighter.health - data.attackingCharacter.attack.value;
        }
      }

      animationTimerAsync();
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
  }, [socket, hitSound]);

  const percentage = calculateCharacterHealth(chosenAttacker);

  const { mainPower, specialPower } =
    calculateAttackTimeRemaining(chosenAttacker);

  const isMainTrue =
    chosenAttacker.mainAttack.name === attackingCharacter?.attack.name;

  const isSpecialTrue =
    chosenAttacker.specialAttack.name === attackingCharacter?.attack.name;

  return (
    <div className="flex flex-col w-full flex-1 justify-between items-center">
      {/* MODAL ANIMATIONS */}
      <FightAnimation
        showModal={showModal}
        animatedAttack={animatedAttack.current}
      />
      <GameOver showModal={gameOverModal} room={room} />

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
      <div className="flex justify-center items-center my-5 md:my-10">
        {chosenAttacker && (
          <FighterCard
            isMainTrue={isMainTrue}
            isSpecialTrue={isSpecialTrue}
            character={chosenAttacker}
          />
        )}
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-40 flex flex-col space-y-2 justify-between bg-slate-900 items-center p-2 w-fit text-2xl text-white rounded-2xl shadow-2xl">
        <div className="relative w-full h-5">
          <div className=" absolute -top-8 md:-top-10 flex justify-evenly w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                chosenAttacker.mainAttack.disabledTurns > 0 ||
                chosenAttacker.health <= 0 ||
                !active
              }
              onClick={() =>
                handleAttackingCharacter(chosenAttacker.mainAttack)
              }
              className={`action-btn ${
                isMainTrue ? "bg-amber-300" : "bg-slate-50"
              }`}
            >
              <SwordIcon id="2" used={mainPower} stroke="black" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                chosenAttacker.specialAttack.disabledTurns > 0 ||
                chosenAttacker.health <= 0 ||
                !active
              }
              onClick={() =>
                handleAttackingCharacter(chosenAttacker.specialAttack)
              }
              className={`action-btn ${
                isSpecialTrue ? "bg-amber-300" : "bg-slate-50"
              }`}
            >
              <SpecialPowerIcon id="3" used={specialPower} stroke="black" />
            </motion.button>
            <motion.button
              disabled={!active}
              onClick={handleDefence}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="action-btn bg-slate-50"
            >
              <ShieldIcon />
            </motion.button>
            <div className="h-12 md:h-16 aspect-square rounded-xl p-1 shadow-2xl bg-slate-50 ">
              <HeartIcon id="1" percentage={percentage} stroke="black">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-900 text-sm font-bold">
                  {chosenAttacker.health}
                </span>
              </HeartIcon>
            </div>
          </div>
        </div>
        <div className="flex">
          {fighters.map((fighter, index) => {
            const data = imageData.find((item) => item.name === fighter.name)!;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative w-1/5 max-w-[100px] mx-1 border-4 aspect-square object-cover border-amber-300 rounded-full hover:cursor-pointer overflow-hidden"
              >
                <img
                  src={data.imageUrl}
                  className="h-full w-full object-cover"
                  onClick={() => handleSelectedFighter(fighter)}
                />
                {fighter.health <= 0 && (
                  <div className="absolute top-0 bottom-0 z-40 flex justify-center items-center w-full h-full">
                    <img src={deadImage} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Arena;
