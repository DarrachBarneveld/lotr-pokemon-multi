import { FC } from "react";

interface LoadingPulseProps {
  text: string;
}

const LoadingPulse: FC<LoadingPulseProps> = ({ text }) => {
  return (
    <div className="flex flex-col space-y-6 items-center">
      <h1 className="text-2xl text-slate-100 font-extrabold">{text}</h1>
      <div className="w-12 h-12 bg-slate-100 rounded-full animate-ping"></div>
    </div>
  );
};

export default LoadingPulse;
