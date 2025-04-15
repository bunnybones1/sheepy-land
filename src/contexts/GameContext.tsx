import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import useCustomContext from "./useCustomContext";

type GameDetails = {
  ids: number[];
  xs: number[];
  ys: number[];
  rotations: number[];
  awakes: number[];
  radiuses: number[];
  masses: number[];
  setXs: Dispatch<SetStateAction<number[]>>;
  setYs: Dispatch<SetStateAction<number[]>>;
  setIds: Dispatch<SetStateAction<number[]>>;
  setAwakes: Dispatch<SetStateAction<number[]>>;
  setMasses: Dispatch<SetStateAction<number[]>>;
  setRadiuses: Dispatch<SetStateAction<number[]>>;
  setRotations: Dispatch<SetStateAction<number[]>>;
};

const GameContext = createContext<GameDetails | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [awakes, setAwakes] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [xs, setXs] = useState<number[]>([]);
  const [ys, setYs] = useState<number[]>([]);
  const [masses, setMasses] = useState<number[]>([]);
  const [radiuses, setRadiuses] = useState<number[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);

  return (
    <GameContext.Provider
      value={{
        ids,
        awakes,
        setAwakes,
        xs,
        ys,
        rotations,
        radiuses,
        masses,
        setIds,
        setXs,
        setYs,
        setMasses,
        setRadiuses,
        setRotations,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  return useCustomContext(GameContext);
}
