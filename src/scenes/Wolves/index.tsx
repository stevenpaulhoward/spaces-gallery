import React, { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "@spacesvr/components/InfinitePlane";
import Player from "@spacesvr/core/players/Player";
import { SceneComponent } from "@spacesvr/core/types/scene";

import { useAnalytics } from "services/analytics";
import RealisticEffects from "@spacesvr/core/effects/RealisticEffects";
import Logo from "@spacesvr/components/Logo";
import WolvesCenter from "./models/WolvesCenter";
import Shop from "./components/Shop";
import { Color } from "three";
import { Sky } from "@react-three/drei";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const Wolves: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  useAnalytics();

  return (
    <Canvas
      {...defaultCanvasProps}
      onCreated={({ scene }) => {
        scene.background = new Color(0x66e8ff);
      }}
    >
      {children}
      <fog attach="fog" args={[0x66e8ff, 1, 50]} />
      <Physics {...physicsProps}>
        <InfinitePlane height={-0.001} />
        <Player useEnvStore={useEnvStore} initPos={[6, 9, 2]} />
        <ambientLight intensity={1} />
        <directionalLight intensity={1} />
        <Logo position={[0, 9, 0]} rotating />
        <RealisticEffects />
        <Suspense fallback={null}>
          <WolvesCenter />
        </Suspense>
        <Shop />
      </Physics>
    </Canvas>
  );
};

export default Wolves;
