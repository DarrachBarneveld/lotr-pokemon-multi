import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Character, IPlayer, IRoom } from "./models";
import LoadingPulse from "./components/ui/LoadingPulse";

import Lobby from "./components/Lobby";
import { socket } from "./config/socket";
import FightZone from "./components/FightZone";

type RoomData = {
  room: IRoom;
  player: IPlayer;
};

function App() {
  const [room, setRoom] = useState<IRoom | undefined>();

  useEffect(() => {
    // socket.on("user_joined_room", (data: RoomData) => {
    //   alert(`User ${data.player.userName} has joined the room!`);
    //   setRoom(data.room);
    // });

    socket.on("leave_room", () => {
      console.log("leave_room");
      setRoom(undefined);
    });

    socket.on("joined", (data) => {
      setRoom(data);
    });

    // socket.on("received_enemy_card", (data) => {
    //   setEnemyFighters((prev) => [...prev, data]);
    // });

    // socket.on("received_message", (data) => alert(data));
    socket.on("room_created", (data) => setRoom(data));
  }, [socket]);

  return (
    <div className="background flex flex-col justify-center items-center space-y-10 h-screen">
      <Navbar />
      {/* <div className="bg-slate-900 text-2xl text-slate-50 p-6">
        <h1>You Are in Room:</h1>
        <h2>{room?.id}</h2>
      </div>
      <h1 className="text-white text-2xl"></h1> */}
      {room ? <FightZone roomInfo={room} /> : <Lobby />}
    </div>
  );
}

export default App;
