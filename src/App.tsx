import { SequenceConnect } from "@0xsequence/connect";
import { config } from "./config";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { Button, SequenceBoilerplate } from "boilerplate-design-system";
import View3D from "./components/3d/View3D";
import ItemViewer3D from "./components/3d/ItemViewer3D";
import { Toaster } from "sonner";
import Game from "./components/3d/Game";
import { GameProvider, useGame } from "./contexts/GameContext";
import { useEffect } from "react";
export default function Layout() {
  return (
    <SequenceConnect config={config}>
      <GameProvider>
        <App />
      </GameProvider>
      <Toaster />
    </SequenceConnect>
  );
}

function App() {
  const {
    xs,
    ys,
    rotations,
    ids,
    setIds,
    setXs,
    setYs,
    setRotations,
    setRadiuses,
    setAwakes,
    setMasses,
    masses,
    awakes,
    radiuses,
  } = useGame();

  const makeSheep = (amt: number) => {
    const temp: number[] = [];
    for (let i = 0; i < amt; i++) {
      temp.push(0);
    }
    setIds(ids.concat(temp.map(() => ~~(Math.random() * 0xffffffff))));
    setXs(xs.concat(temp.map(() => (Math.random() - 0.5) * 4)));
    setYs(ys.concat(temp.map(() => (Math.random() - 0.5) * 4)));
    setRadiuses(radiuses.concat(temp.map(() => 0.5)));
    setMasses(masses.concat(temp.map(() => 1)));
    setAwakes(awakes.concat(temp.map(() => 2)));
    setRotations(rotations.concat(temp.map(() => Math.random() * Math.PI * 2)));
    console.log(ids.length + amt);
  };

  useEffect(() => {
    if (ids.length > 0) {
      return;
    }
    makeSheep(30);
  }, [ids]);

  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/bunnybones1/sheepy-land"
      name="Sheepy Land"
      description="Living in fleece and harmoney"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
    >
      <View3D>
        <ItemViewer3D>
          <Game />
        </ItemViewer3D>
      </View3D>
      <br />
      <Button
        variant="primary"
        className="w-full"
        onClick={() => makeSheep(10)}
      >
        Add 10
      </Button>
    </SequenceBoilerplate>
  );
}
