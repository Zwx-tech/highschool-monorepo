import { RigidBody } from "@react-three/rapier";

export const Ground = (props: any) => {
  return (
    <RigidBody name="floor" type="fixed" colliders="cuboid" {...props}>
      <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 1000, 1000]} />
        <meshStandardMaterial color="yellow" opacity={0.001} transparent />
      </mesh>
    </RigidBody>
  );
};
