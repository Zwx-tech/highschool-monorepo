import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Physics } from "@react-three/rapier";
import Game from "./components/Game";

function App() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Physics gravity={[0, -1, 0]} timeStep={"vary"}>
        <Game />
      </Physics>
    </Canvas>
  );
}

export default App;
