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
  const [randomCharacters, setRandomCharacters] = useState<Character[]>([]);

  useEffect(() => {
    socket.on("random_characters", (data) => {
      setRandomCharacters(data);
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
    <div className="flex flex-1 flex-col justify-evenly items-center w-full">
      {randomCharacters.length > 0 && (
        <h2 className="text-3xl text-white uppercase font-bold md:text-5xl">
          Pick a card
        </h2>
      )}
      <div className=" flex flex-wrap justify-center items-center max-w-lg gap-2 ">
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
