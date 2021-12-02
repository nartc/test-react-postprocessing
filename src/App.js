import "./styles.css";
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { EffectComposer, SSAO, Bloom } from "react-postprocessing";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "drei";

function Keen() {
  const ref = useRef();

  useFrame(state => {
    ref.current.rotation.y = 0;
    ref.current.rotation.x = -Math.PI / 2;
    ref.current.rotation.z += 0.01;
  });

  const { nodes, materials } = useLoader(GLTFLoader, "/scene.gltf");
  return (
    <group ref={ref} position={[0, -7, 0]} dispose={null}>
      <mesh
        material={materials["Scene_-_Root"]}
        geometry={nodes.mesh_0.geometry}
        castShadow
        receiveShadow
      />
    </group>
  );
}

export default function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 15], near: 5, far: 20 }}>
        <OrbitControls />
        <Suspense fallback={null}>
          <Keen />
        </Suspense>
        <ambientLight />
        <directionalLight position={[0, 1, 2]} color="white" />
        <Suspense fallback={null}>
          <EffectComposer smaa>
            <Bloom />
            <SSAO />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
