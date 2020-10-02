import React, { useMemo, Suspense } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import InfinitePlane from "three-components/InfinitePlane";
import Logo from "three-components/Logo";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import { Color } from "three";
import Floor from "./components/Floor";
import NarrativeEffects from "./components/NarrativeEffects";
import House from "./components/House";
import { GRAY } from "./components/Colors";
import Hills from "./components/Hills";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  gravity: [0, -30, 0],
  defaultContactMaterial: {
    friction: 0,
  },
};

const BG_COLOR = new Color(GRAY);

const Narrative: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  return (
    <>
      <Analytics />
      <Canvas
        {...defaultCanvasProps}
        camera={{ far: 500 }}
        colorManagement={true}
      >
        {children}
        <color
          attach="background"
          args={[BG_COLOR.r, BG_COLOR.g, BG_COLOR.b]}
        />
        <fog attach="fog" args={[GRAY, 100, 400]} />
        <Physics {...physicsProps}>
          <InfinitePlane height={-0.001} />
          <ambientLight intensity={1} />
          {/*<pointLight intensity={4} position={[0, 8, 0]} />*/}
          <Floor />
          <Player useEnvStore={useEnvStore} initPos={[0, 0, 8]} />
          <House />
          <Hills angle={Math.PI / 6.32} dimensions={[200, 50]} dist={100} />
          <Hills
            angle={-Math.PI / 4.641}
            dimensions={[300, 90]}
            dist={175}
            tall={20}
          />
          <Hills angle={Math.PI} dimensions={[300, 90]} dist={175} />
          <Hills
            angle={(Math.PI * Math.PI) / 4}
            dimensions={[500, 90]}
            dist={250}
            tall={30}
          />
          <Logo
            floating
            rotating
            useEnvStore={useEnvStore}
            position={[0, -10, 0]}
          />
          <NarrativeEffects />
        </Physics>
      </Canvas>
    </>
  );
};

export default Narrative;
