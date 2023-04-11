import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { socket } from "../config/socket";
import { IRoom } from "../models";

interface ChatBoxProps {
  room: IRoom;
}

const ChatBox: FC<ChatBoxProps> = ({ room }) => {
  const [open, setOpen] = useState(false);
  const [chatText, setChatText] = useState("");
  const [chatArray, setChatArray] = useState<JSX.Element[]>([]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    socket.emit("send_message", { message: chatText, roomId: room?.id });

    const message = (
      <div key={v4()} className="flex">
        <p className="text-left bg-green-400 w-fit p-2 rounded-xl right-0">
          {chatText}
        </p>
      </div>
    );

    setChatArray((prev) => [...prev, message]);

    setChatText("");
  }

  useEffect(() => {
    socket.on("received_message", (data) => {
      const message = (
        <div key={v4()} className="flex flex-row-reverse w-full">
          <p className="text-left bg-blue-400 w-fit p-2 rounded-xl right-0">
            {data}
          </p>
        </div>
      );
      setChatArray((prev) => [...prev, message]);
    });
  }, [socket]);

  return (
    <div className="absolute flex z-50 left-1 top-1 flex-col p-2 border-2 border-green-600 bg-slate-50 w-fit max-w-xs rounded-xl shadow-2xl">
      {open ? (
        <>
          <div className="relative text-2xl border-b-slate-500 border-b p-1">
            <h3 className="font-bold">Messages</h3>
            <FontAwesomeIcon
              icon={faComments}
              className="absolute top-0 right-0 text-green-600 text-3xl hover:cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex flex-col h-full min-h-[300px] max-h-[500px] justify-between">
            <div className="flex-1 overflow-scroll space-y-2 mt-2 text-xs">
              {chatArray}
            </div>
            <form className="flex" onSubmit={handleFormSubmit}>
              <textarea
                className="border-2 flex-1 border-slate-500 flex-end rounded-xl font-xl p-1 h-* resize-none bg-slate-200"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onSubmit={() => console.log(chatText)}
              />
              <button
                className="group flex h-full justify-center items-center text-3xl px-2"
                type="submit"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="flex items-center justify-center text-green-600 group-hover:text-green-500 group-hover:cursor-pointer "
                />
              </button>
            </form>
          </div>
        </>
      ) : (
        <FontAwesomeIcon
          icon={faComments}
          className="text-sm text-green-600 md:text-3xl hover:cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
    </div>
  );
};

export default ChatBox;
