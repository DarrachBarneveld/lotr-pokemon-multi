import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { IRoom } from "./models";

import Lobby from "./components/Lobby";
import { socket } from "./config/socket";
import FightZone from "./components/FightZone";
import HomePage from "./components/HomePage";

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

    socket.on("room_created", (data) => setRoom(data));
  }, [socket]);

  return (
    <div className={`background ${room?.zone}`}>
      <Navbar />
      <main className="flex flex-col flex-1">
        {/* <HomePage /> */}

        {room ? <FightZone roomInfo={room} /> : <Lobby />}
      </main>
    </div>
  );
}

export default App;
