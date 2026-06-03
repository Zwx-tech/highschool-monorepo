import React, { useRef, useState, useImperativeHandle, useEffect } from "react";
import { Mesh, Vector3, Vector3Tuple, Euler } from "three";
import { useWebsocket } from "@/hooks/useWebsocket";
import { acceleration } from "@/types/types";
import { Mario } from "@/models/player/Mariokarttest";
import * as THREE from "three";

import {
  RigidBody,
  RapierRigidBody,
  BallCollider,
  CuboidCollider,
  euler,
} from "@react-three/rapier";
import { Euler as EulerTouple, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

interface PlayerProps {
  startingPosition: Vector3Tuple;
  startingRotation: EulerTouple;
}

interface WebSocketData {
  acceleration: acceleration;
  breakActive: boolean;
  gasActive: boolean;
}

const Player = React.forwardRef<any, PlayerProps>(
  ({ startingPosition, startingRotation }, ref) => {
    const bodyRef = useRef<RapierRigidBody>(null);
    const kartRef = useRef<Mesh>(null);
    const [inputData, setInputData] = useState<WebSocketData>({
      acceleration: { x: 0, y: 0, z: 0 },
      breakActive: false,
      gasActive: false,
    });

    const ws = useWebsocket(
      "ws://192.168.1.28:1337",
      async (data: { data: Blob }) => {
        const webSocketData = (await JSON.parse(
          await data.data.text()
        )) as WebSocketData;
        setInputData(webSocketData);
      }
    );

    useImperativeHandle(ref, () => ({
      get position() {
        if (bodyRef.current) return bodyRef.current.translation();
      },
      get rotation() {
        if (kartRef.current) {
          const r = kartRef.current.rotation;
          return r;
        }
      },
    }));

    useFrame((_, delta) => {
      const { acceleration, breakActive, gasActive } = inputData;
      if (bodyRef.current && kartRef.current) {
        const position = bodyRef.current.translation();
        const rotation = bodyRef.current.rotation();

        // Convert Rapier rotation to Euler angles
        // Euler angles uses Quaternions so we are fucked
        const eulerRotation = new THREE.Euler().setFromQuaternion(
          new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w)
        );

        // Update position and rotation of the kart mesh
        kartRef.current.position.set(position.x, position.y - 0.01, position.z);
        kartRef.current.rotation.set(
          eulerRotation.x,
          eulerRotation.y,
          eulerRotation.z
        );
      }

      if (bodyRef.current) {
        const rotation = bodyRef.current.rotation();
        const directionVector = new THREE.Vector3(0, 0, 1).applyQuaternion(
          rotation
        );

        const forceMagnitude = 0.00001; // Adjust as needed
        // Apply acceleration force
        if (gasActive) {
          bodyRef.current.applyImpulse(
            directionVector.normalize().multiplyScalar(forceMagnitude * delta),
            true
          );
        }

        // Apply braking force (reverse force)
        if (breakActive) {
          bodyRef.current.applyImpulse(
            directionVector.normalize().multiplyScalar(-forceMagnitude * delta),
            true
          );
        }

        // Steering
        const steeringAmpFactor = 1.2;
        const steeringAmplification = acceleration.x < 0 ? -acceleration.x : 0;
        const steeringFactor =
          acceleration.y > 0
            ? acceleration.y + steeringAmplification
            : acceleration.y - steeringAmplification;

        if (Math.abs(steeringFactor) > 0.35) {
          const eulerRotation = new THREE.Euler().setFromQuaternion(
            new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w)
          );

          const dRY = steeringFactor * delta * steeringAmpFactor;

          // Create a quaternion representing the desired rotation
          const deltaQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(0, -dRY, 0)
          );

          // Combine the new rotation with the current rotation
          const newQuaternion = new THREE.Quaternion().multiplyQuaternions(
            new THREE.Quaternion().setFromEuler(eulerRotation),
            deltaQuaternion
          );

          // Apply rotation to the kart mesh
          bodyRef.current.setRotation(newQuaternion, true);
        }
      }
    });

    return (
      <group>
        <RigidBody
          colliders={"ball"}
          type="dynamic"
          mass={100}
          ref={bodyRef}
          lockRotations={true}
          position={startingPosition}
          onCollisionEnter={({ other }) => console.log(other)}
          rotation={startingRotation}
          friction={0}
        >
          <Box scale={0.02}>
            <meshLambertMaterial opacity={0.01} transparent={true} />
          </Box>
          {/* <CuboidCollider args={[0.02, 0.5, 0.02]} /> */}
        </RigidBody>
        <mesh scale={0.02} ref={kartRef}>
          <Mario />
        </mesh>
      </group>
    );
  }
);

export default Player;
