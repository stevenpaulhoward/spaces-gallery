import React, { Suspense, useEffect, useRef, useState } from "react";
import { EnvironmentStoreHook } from "stores/environment";
import { Color, Mesh } from "three";
import ChadKnight from "models/ChadKnight";
import { useFrame } from "react-three-fiber";
import { CHAD_COLOR, CHAD_COLOR2 } from "../index";

type ChadKnightProps = {
  useEnvStore: EnvironmentStoreHook;
  effects: {
    wireframe: boolean;
    bubble: boolean;
    metal: boolean;
    reflect: boolean;
    color?: boolean;
  };
};

const SCALE = 1.3;

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "white",
  "black",
];

const ChadKnightPieces = (props: ChadKnightProps) => {
  const {
    useEnvStore,
    effects: { wireframe = true, bubble, metal, reflect, color = false },
  } = props;

  const sphere = useRef<Mesh>();
  const wireframeColor = new Color("red");
  // console.log(effects)

  useFrame(({ clock }) => {
    if (sphere.current) {
      sphere.current.rotation.y = clock.getElapsedTime() / 10;
    }
  });

  const [realColor, setColor] = useState<string>("red");
  useEffect(() => {
    console.log("run");
    setColor(colors[Math.floor(Math.random() * 8)]);
  }, [color]);

  return (
    <group>
      <group scale={[SCALE, SCALE, SCALE]}>
        <Suspense fallback={null}>
          <ChadKnight
            useEnvStore={useEnvStore}
            color={color ? realColor : CHAD_COLOR2}
          />
        </Suspense>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[8, 5 * 14, 3 * 14]} />
          <meshLambertMaterial
            attach="material"
            wireframe
            color={color ? realColor : CHAD_COLOR}
            emissive={new Color(0x000000)}
            emissiveIntensity={10}
          />
        </mesh>
      </group>
    </group>
  );
};

export default ChadKnightPieces;
