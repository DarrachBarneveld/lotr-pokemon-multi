import { FC, useContext, useEffect, useState } from "react";
import { socket } from "../config/socket";
import { ArenaContext } from "../context/ArenaContext";
import { Attack, AttackingCharacter, Character, IRoom } from "../models";
import Card from "./Card";
import EnemyCard from "./EnemyCard";

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
  //   const [targetCharacter, setTargetCharacter] = useState<Character>();

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

  function handleAttackingCharacter(name: string, attack: Attack) {
    const attackingModel = {
      name,
      attack,
    };
    setAttackingCharacter(attackingModel);
  }

  function handleTargetCharacter(targetCharacter: Character) {
    // setTargetCharacter(character);

    socket.emit("attack", { attackingCharacter, targetCharacter, room });
    socket.emit("increment_turn", room);
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

    socket.on("winning_alert", () => alert("YOU WON"));
    socket.on("losing_alert", () => alert("YOU LOST"));
  }, [socket]);

  return (
    <>
      <h1>{attackingCharacter?.name}</h1>
      <div className="flex flex-col h-full flex-1 justify-between items-center">
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
        <div className="flex flex-wrap gap-2">
          {fighters.length > 0 &&
            fighters.map((char, index) => (
              <Card
                active={active}
                key={index}
                character={char}
                setAttackingCharacter={handleAttackingCharacter}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Arena;
