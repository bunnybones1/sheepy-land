import { useFrame } from "@react-three/fiber";
import { useGame } from "../../contexts/GameContext";
import DynamicItem from "./DynamicItem";

const pushStrengthActors = 0.5;

export default function Game() {
  const {
    ids,
    xs,
    ys,
    setXs,
    setYs,
    radiuses,
    rotations,
    masses,
    awakes,
    setAwakes,
  } = useGame();
  useFrame(() => {
    const newXs = xs.slice();
    const newYs = ys.slice();
    const newAwakes = awakes.slice();
    const len = ids.length;
    for (let ia = 0; ia < len; ia++) {
      const pax = xs[ia];
      const pay = ys[ia];
      const aAwake = awakes[ia];
      for (let ib = ia + 1; ib < len; ib++) {
        const pbx = xs[ib];
        const pby = ys[ib];
        const bAwake = awakes[ib];
        if (aAwake === 0 && bAwake === 0) {
          continue;
        }

        const minDist = radiuses[ia] + radiuses[ib];

        const dx = pax - pbx;
        if (Math.abs(dx) > minDist) {
          continue;
        }

        const dy = pay - pby;
        if (Math.abs(dy) > minDist) {
          continue;
        }

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          newAwakes[ia] = 2;
          newAwakes[ib] = 2;
          const overlapPercent = 1 - dist / minDist;
          const nx = dx * overlapPercent * pushStrengthActors;
          const ny = dy * overlapPercent * pushStrengthActors;
          const ratio = masses[ia] / (masses[ia] + masses[ib]);
          const ratioInv = 1 - ratio;
          newXs[ia] += nx * ratioInv;
          newYs[ia] += ny * ratioInv;
          newXs[ib] -= nx * ratio;
          newYs[ib] -= ny * ratio;
        }
      }
    }
    setXs(newXs);
    setYs(newYs);
    setAwakes(newAwakes);
  });

  return (
    <>
      {ids.map((id, i) => (
        <DynamicItem
          key={id}
          id={id}
          x={xs[i]}
          y={ys[i]}
          rotation={rotations[i]}
          gltfUrl={`/sheep.glb`}
        />
      ))}
    </>
  );
}
