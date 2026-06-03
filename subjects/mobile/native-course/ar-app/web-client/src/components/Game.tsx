import React, { useRef } from "react";
import Player from "./Player";
import { ParisBis } from "@/models/tracks/Paris-bis";
import Camera from "./Camera";
import { Ground } from "./Ground";
import { OrbitControls } from "@react-three/drei";
import { Vector } from "three/examples/jsm/Addons.js";
import { Vector3, Vector3Tuple } from "three";
import {
  EffectComposer,
  N8AO,
  Bloom,
  TiltShift2,
  HueSaturation,
  SMAA,
  ChromaticAberration,
  Vignette,
  LUT,
} from "@react-three/postprocessing";

function Game() {
  const playerRef = useRef<any>(null);
  const playerPos = [0, 0.3, -2.4] as Vector3Tuple;

  console.log(playerRef.current?.position);

  return (
    <>
      <Player
        ref={playerRef}
        startingPosition={playerPos}
        startingRotation={[0, -Math.PI / 2, 0]}
      />
      <ParisBis position={[0, 0, 0]} />
      <Ground position={[0, 0.1, 0]} />
      {/* <OrbitControls target={playerPos} />; */}
      <Camera playerRef={playerRef} />
      <EffectComposer
        multisampling={0}
        // @ts-ignore
        disableNormalPass
        disableSSAO
        disableDepthPass
      >
        <SMAA />
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.01}
          intensity={0.5}
        />
        <TiltShift2 />
        <HueSaturation saturation={0.05} />
        {/* @ts-ignore */}
        <ChromaticAberration offset={[0.0006, 0.0006]} />
      </EffectComposer>
    </>
  );
}

export default Game;
