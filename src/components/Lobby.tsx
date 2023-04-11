import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { socket } from "../config/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRoom } from "../models";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

interface LobbyProps {}

const Lobby: FC<LobbyProps> = ({}) => {
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);
  const [totalUsers, setAllUsers] = useState(0);

  useEffect(() => {
    socket.emit("load_all_rooms");
    socket.on("display_all_rooms", (data) => {
      setAllRooms(data.filteredArray);
      setAllUsers(data.totalUsers);
    });
  }, []);

  //   function sendMessage() {
  //     socket.emit("send_message", { message: "hello", roomId: room?.id });
  //   }

  const handleCreateRoom = () => {
    const roomId = v4();
    socket.emit("create_room", `id_${roomId}`);
  };

  const handleSearchRoom = () => {
    socket.emit("load_all_rooms");
  };

  const handleJoinRoom = () => {
    socket.emit("join_room");
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col h-[600px] pt-0 overflow-scroll items-center max-w-5xl rounded-xl space-y-4 bg-slate-100 border-2 border-slate-800 ">
        <div className="bg-slate-800 w-full text-lg space-y-2">
          <div className=" relative flex justify-center m-1">
            <h3 className="text-3xl font-extrabold uppercase text-slate-50">
              Lobby
            </h3>
            <div className="absolute top-0 right-0 flex  space-x-1">
              <div className="space-x-3 bg-green-500 py-1 px-2 rounded-lg font-bold text-slate-50">
                <FontAwesomeIcon icon={faHouse} />
                <span>{allRooms.length}</span>
              </div>
              <div className=" space-x-3 bg-green-500 py-1 px-2 rounded-lg font-bold text-slate-50">
                <FontAwesomeIcon icon={faUsers} />
                <span>{totalUsers}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-3  bg-slate-800 w-full border-b border-slate-50">
            <button className="btn" onClick={handleSearchRoom}>
              Search Room
            </button>
            <button className="btn" onClick={handleJoinRoom}>
              Join Room
            </button>
            <button className="btn" onClick={handleCreateRoom}>
              Create Room
            </button>
          </div>
        </div>
        <div className="p-5 space-y-2">
          {allRooms.length == 0 && (
            <div className="flex flex-col items-center bg-slate-800 w-[500px] p-5 text-center text-slate-50 space-y-2 rounded-xl">
              <h2 className="text-2xl">No Rooms Available</h2>
              <button className="btn w-fit" onClick={handleCreateRoom}>
                Create Room
              </button>
            </div>
          )}
          {allRooms.map((room, index) => (
            <div
              key={index}
              className="flex justify-center bg-slate-800 w-[500px] px-2 py-10 text-center text-slate-50 space-x-4 rounded-xl hover:bg-slate-600 hover:cursor-pointer"
            >
              <p>
                <strong>ROOM:</strong>
                {room.id}
              </p>
              <p>
                <strong>USERS:</strong>
                {room.users}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
