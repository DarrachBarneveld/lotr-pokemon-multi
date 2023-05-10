import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { socket } from "../config/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRoom } from "../models";
import {
  faHouse,
  faSearch,
  faShuffle,
  faSquarePlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import BackgroundSelection from "./BackgroundSelection";

interface LobbyProps {}

const Lobby: FC<LobbyProps> = ({}) => {
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);
  const [totalUsers, setAllUsers] = useState(0);
  const [creatingRoom, setCreatingRoom] = useState(false);

  useEffect(() => {
    socket.emit("load_all_rooms");
    socket.on("display_all_rooms", (data) => {
      setAllRooms(data.finalArrayData);
      setAllUsers(data.totalUsers);
    });
  }, []);

  const handleCreateRoom = (zone: string) => {
    const roomId = v4();
    const data = {
      id: `id_${roomId}`,
      zone,
    };
    socket.emit("create_room", data);
  };

  const handleSearchRoom = () => {
    socket.emit("load_all_rooms");
  };

  const handleJoinRoom = (id?: string) => {
    socket.emit("join_room", id);
  };

  return (
    <>
      {creatingRoom ? (
        <BackgroundSelection handleCreateRoom={handleCreateRoom} />
      ) : (
        <div className="flex flex-1 justify-center items-center p-2">
          <div className="flex flex-col h-[600px] pt-0 overflow-scroll items-center w-full max-w-xl rounded-xl space-y-4 bg-slate-100 border-2 border-slate-800 ">
            <div className="bg-slate-800 w-full text-lg space-y-2">
              <div className="relative flex justify-evenly p-1 md:justify-center">
                <h3 className="text-3xl font-extrabold uppercase text-slate-50">
                  Lobby
                </h3>
                <div className="flex justify-evenly md:absolute top-0 right-0 space-x-1">
                  <div className="h-fit space-x-3 bg-green-500 px-1 rounded-lg font-bold text-slate-50">
                    <FontAwesomeIcon icon={faHouse} />
                    <span>{allRooms.length}</span>
                  </div>
                  <div className="h-fit space-x-3 bg-green-500 px-1 rounded-lg font-bold text-slate-50">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{totalUsers}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-2  bg-slate-800 w-full border-b border-slate-50">
                <button
                  className="btn text-slate-50 space-x-1"
                  onClick={handleSearchRoom}
                >
                  <FontAwesomeIcon icon={faSearch} />
                  <span>Search</span>
                </button>
                <button
                  className="btn text-slate-50 space-x-1"
                  onClick={() => handleJoinRoom()}
                >
                  <FontAwesomeIcon icon={faShuffle} />
                  <span>Join</span>
                </button>
                <button
                  className="btn text-slate-50 space-x-1"
                  onClick={() => setCreatingRoom(true)}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                  <span>Create</span>
                </button>
              </div>
            </div>
            <div className="p-2 space-y-2 w-full">
              {allRooms.length == 0 && (
                <div className="flex flex-col items-center bg-slate-800 w-full py-5 px-2 text-center text-slate-50 space-y-2 rounded-xl">
                  <h2 className="text-2xl">No Rooms Available</h2>
                  <button
                    className="btn w-fit"
                    onClick={() => setCreatingRoom(true)}
                  >
                    Create Room
                  </button>
                </div>
              )}
              {allRooms.map((room, index) => {
                console.log(room);
                return (
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    key={index}
                    className={`relative flex justify-between w-full py-5 text-base text-slate-50 rounded-xl overflow-hidden md:text-lg  md:py-10 md:px-4 border-2 border-slate-900 hover:brightness-125 transition-all duration-300 focus:brightness-125 hover:scale-105 focus:scale-105 hover:cursor-pointer ${room.zone}`}
                  >
                    <p className=" font-extrabold rounded-lg p-1">
                      ROOM: {room.id.substring(0, 10)}
                    </p>
                    <p className=" font-extrabold rounded-lg p-1">
                      USERS: {room.users}
                    </p>
                    <p className=" font-extrabold rounded-lg p-1 uppercase">
                      ZONE: {room.zone}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lobby;
