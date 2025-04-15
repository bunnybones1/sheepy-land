import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Box3, Group, Vector3 } from "three";

const tempVec3 = new Vector3();
export default function DynamicItem(props: {
  x: number;
  y: number;
  rotation: number;
  gltfUrl: string;
  id: number;
}) {
  const { gltfUrl, id, x, y, rotation } = props;
  const { nodes } = useGLTF(gltfUrl);
  const bbox = new Box3();
  if (nodes["Scene"]) {
    bbox.setFromObject(nodes["Scene"]);
  }
  bbox.getSize(tempVec3);
  const largestSize = Math.max(tempVec3.x, Math.max(tempVec3.y, tempVec3.z));
  const size = new Vector3(2, 2, 2).divideScalar(largestSize);
  bbox.getCenter(tempVec3).multiply(size);
  const center = new Vector3(0, 0, 0).sub(tempVec3);
  const myGroup = useRef<Group | null>(null);
  useFrame(({ clock }) => {
    if (!myGroup.current) {
      return;
    }
    const now = clock.getElapsedTime() + id;
    myGroup.current.rotation.y = Math.sin(now) * 0.2;
    myGroup.current.rotation.x = Math.sin(now * 4) * 0.05;
    myGroup.current.children[0].children[0].children[2].rotation.x =
      Math.sin(now * 22) * 0.6;
  });

  return (
    <group rotation={[0, rotation, 0]} position={[x, 0, y]}>
      <group ref={myGroup}>
        <Clone scale={size} position={center} object={nodes["Scene"]} />
      </group>
    </group>
  );
}
