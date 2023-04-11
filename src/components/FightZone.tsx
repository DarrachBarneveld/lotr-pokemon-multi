import { FC, useEffect, useState } from "react";

import { socket } from "../config/socket";
import ArenaContextProvider from "../context/ArenaContext";
import { assignTurn } from "../helpers/gamingFunction";
import { Character, IPlayer, IRoom } from "../models";
import Arena from "./Arena";
import ChatBox from "./ChatBox";
import PickZone from "./PickZone";
import LoadingPulse from "./ui/LoadingPulse";

interface FightZoneProps {
  roomInfo: IRoom;
}

type RoomData = {
  room: IRoom;
  player: IPlayer;
};

const FightZone: FC<FightZoneProps> = ({ roomInfo }) => {
  const [room, setRoom] = useState<IRoom>(roomInfo);
  const [userIndex, setUserIndex] = useState(0);
  const [enemyFlipped, setEnemyFlipped] = useState<Character[]>([]);

  const turn = assignTurn(room.turnIndex);

  const active = turn === userIndex;

  useEffect(() => {
    socket.on("update_turn", (data) => setRoom(data));
  }, [socket]);

  useEffect(() => {
    socket.emit("set_active_player", room);
    socket.on("set_index", (data) => setUserIndex(data));
  }, []);

  useEffect(() => {
    socket.on("user_joined_room", (data: RoomData) => {
      // alert(`User ${data.player.userName} has joined the room!`);
      setRoom(data.room);
    });
  }, [socket]);

  return (
    <ArenaContextProvider>
      {!active && (
        <div className="absolute top-0 bottom-0 flex flex-col justify-center items-center h-full w-full bg-black/50 z-40">
          {room.users === 2 ? (
            <LoadingPulse text="Opponents Turn" />
          ) : (
            <LoadingPulse text="Waiting Player 2" />
          )}
        </div>
      )}
      <div className="relative flex p-2 justify-between flex-1 flex-col ">
        <ChatBox room={room} />
        {room.turnIndex <= 10 ? (
          <PickZone
            room={room}
            active={active}
            setEnemyFlipped={setEnemyFlipped}
            enemyFlipped={enemyFlipped}
          />
        ) : (
          <Arena room={room} active={active} />
        )}
      </div>
    </ArenaContextProvider>
  );
};

export default FightZone;
