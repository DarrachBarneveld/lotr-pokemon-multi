import { FC } from "react";
import Region from "./Region";

interface BackgroundSelectionProps {
  handleCreateRoom: (id: string) => void;
}

const BackgroundSelection: FC<BackgroundSelectionProps> = ({
  handleCreateRoom,
}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-2 p-4">
        <Region region="rohan" onClick={() => handleCreateRoom("rohan")} />
        <Region region="mordor" onClick={() => handleCreateRoom("mordor")} />
        <Region
          region="isengard"
          onClick={() => handleCreateRoom("isengard")}
        />
        <Region region="gondor" onClick={() => handleCreateRoom("gondor")} />
        <Region region="shire" onClick={() => handleCreateRoom("shire")} />
        <Region region="erebor" onClick={() => handleCreateRoom("erebor")} />
      </div>
    </div>
  );
};

export default BackgroundSelection;
