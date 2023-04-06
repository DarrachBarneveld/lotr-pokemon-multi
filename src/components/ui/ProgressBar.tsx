import { FC } from "react";
import { adjustPercentage } from "../../helpers/gamingFunction";

interface ProgressBarProps {
  reverseWidth: number;
  color: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ reverseWidth, color }) => {
  const widthNum = adjustPercentage(reverseWidth);

  const width = `${widthNum}%`;

  return (
    <div className="w-full bg-slate-600 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`${color} h-2.5 rounded-full`} style={{ width }}></div>
    </div>
  );
};

export default ProgressBar;
