import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Euler, Vector3 } from "three";

function Camera({ playerRef }: { playerRef: any }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  console.log(cameraRef.current);
  useFrame(() => {
    if (playerRef.current) {
      if (!playerRef.current.position || !playerRef.current.rotation) return;
      cameraRef.current.far = 5000;
      cameraRef.current.near = 0.01;
      const playerPosition = new Vector3(); // playerRef.current.position as Vector3;
      const playerRotation = new Euler(); //playerRef.current.rotation as Euler;

      playerPosition.copy(playerRef.current.position);
      playerRotation.copy(playerRef.current.rotation);

      // playerPosition.x -= Math.PI / 2;

      // Offset behind the player
      const offset = new Vector3(0, 0.05, -0.14);
      offset.applyEuler(playerRotation);

      // New camera position
      const cameraPosition = playerPosition.add(offset);
      cameraRef.current.position.copy(cameraPosition);

      // Make the camera look at the player
      const lookAtTarget = new Vector3();
      lookAtTarget.copy(playerRef.current.position);
      lookAtTarget.y += 0.074;
      cameraRef.current.lookAt(lookAtTarget);
    }
  });

  return null;
}

export default Camera;
