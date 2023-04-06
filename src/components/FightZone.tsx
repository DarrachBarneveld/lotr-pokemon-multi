import { FC, useEffect, useState } from "react";

import { socket } from "../config/socket";
import ArenaContextProvider from "../context/ArenaContext";
import { assignTurn } from "../helpers/gamingFunction";
import { Character, IPlayer, IRoom } from "../models";
import Arena from "./Arena";
import PickZone from "./PickZone";

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

    socket.on("received_message", (data) => alert(data));
  }, [socket]);

  console.log(room);

  return (
    <ArenaContextProvider>
      <div className="flex flex-col h-full py-6">
        <h1 className="text-4xl text-slate-50 font-extrabold">{userIndex}</h1>
        {room.turnIndex <= 2 ? (
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
