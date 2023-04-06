import { FC } from "react";

interface LoadingPulseProps {}

const LoadingPulse: FC<LoadingPulseProps> = () => {
  return (
    <>
      <h1 className="text-2xl text-slate-100 font-extrabold">
        Waiting for players...
      </h1>
      <div className="w-12 h-12 bg-slate-100 rounded-full animate-ping"></div>
    </>
  );
};

export default LoadingPulse;
