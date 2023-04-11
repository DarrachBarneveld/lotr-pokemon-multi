import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { IPlayer, IRoom } from "./models";

import Lobby from "./components/Lobby";
import { socket } from "./config/socket";
import FightZone from "./components/FightZone";
import data from "./assets/data/characters.json";
import FlipCard from "./components/FlipCard";

type RoomData = {
  room: IRoom;
  player: IPlayer;
};

function App() {
  const [room, setRoom] = useState<IRoom | undefined>();

  useEffect(() => {
    // socket.emit("default_join");
    // socket.on("joined_default", (data) => setRoom(data));

    socket.on("leave_room", () => {
      setRoom(undefined);
    });

    socket.on("joined", (data) => {
      setRoom(data);
    });

    // socket.on("received_enemy_card", (data) => {
    //   setEnemyFighters((prev) => [...prev, data]);
    // });

    // socket.on("received_message", (data) => alert(data));
    // socket.on("room_created", (data) => setRoom(data));
  }, [socket]);

  console.log(room);

  return (
    <div className="background">
      <Navbar />
      <div className="flex flex-col flex-1">
        {room ? <FightZone roomInfo={room} /> : <Lobby />}
      </div>
    </div>
  );
}

export default App;
