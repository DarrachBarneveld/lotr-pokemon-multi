import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { socket } from "../config/socket";
import { ArenaContext } from "../context/ArenaContext";
import { Character, IRoom } from "../models";

import FlipCard from "./FlipCard";

interface PickZoneProps {
  room: IRoom;
  active: boolean;
  setEnemyFlipped: Dispatch<SetStateAction<Character[]>>;
  enemyFlipped: Character[];
}

const PickZone: FC<PickZoneProps> = ({
  room,
  active,
  setEnemyFlipped,
  enemyFlipped,
}) => {
  const { setFighters, setEnemyFighters } = useContext(ArenaContext);
  const randomCharactersRef = useRef<Character[]>();
  const [randomCharacters, setRandomCharacter] = useState<Character[]>([]);

  useEffect(() => {
    socket.on("random_characters", (data) => {
      setRandomCharacter(data);
      randomCharactersRef.current = data;
    });

    return () => {
      socket.off("random_characters");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("received_enemy_card", (data) => {
      setEnemyFighters((prev) => [...prev, data]);
      const flipCard = randomCharactersRef.current!.find(
        (card) => card.name === data.name
      )!;
      setEnemyFlipped((prev) => [...prev, flipCard]);
    });
  }, [socket]);

  function handleSelectedFighters(character: Character) {
    setFighters((prev) => [...prev, character]);
    socket.emit("chosen_card", { character, roomId: room?.id });
    socket.emit("increment_turn", room);
  }

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {randomCharacters.map((char, index) => {
          if (enemyFlipped.includes(char)) {
            return (
              <FlipCard
                active={active}
                actionFlip={true}
                key={index}
                character={char}
                actionFunction={handleSelectedFighters}
              />
            );
          } else
            return (
              <FlipCard
                active={active}
                actionFlip={false}
                key={index}
                character={char}
                actionFunction={handleSelectedFighters}
              />
            );
        })}
      </div>
    </div>
  );
};

export default PickZone;
