import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export type MintStatus = "notStarted" | "pending" | "success" | "failed";

export default function Chest() {
  const { nodes } = useGLTF("/chest.glb");
  const myGroup = useRef<Group | null>(null);
  useFrame(({ clock }) => {
    if (!myGroup.current) {
      return;
    }
    const now = clock.getElapsedTime();
    myGroup.current.rotation.y = Math.sin(now) * 0.2;
    myGroup.current.rotation.x = Math.sin(now * 4) * 0.05;
  });

  return (
    <group rotation={[0.25, 0.65, 0]} position={[0, 0, -2]}>
      <group ref={myGroup}>
        <Clone
          scale={[2.5, 2.5, 2.5]}
          position={[0, -1.75, 0]}
          object={nodes["chest"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/chest.glb");
