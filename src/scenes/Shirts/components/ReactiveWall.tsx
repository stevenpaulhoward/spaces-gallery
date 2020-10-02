import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
// import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
// import { draco } from "drei";
// import { ModelProps } from "../types/model";
// import { loadModel } from "../services/loader";
// import { BufferGeometry } from "three";
// import { useConvexPolyhedron } from "use-cannon";
import { EnvironmentStoreHook } from "stores/environment";
import { AudioAnalyserStoreHook } from "stores/audio";

//this should be moved to the types folder eventually
type AudioReactiveModelProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  useAAStore: AudioAnalyserStoreHook;
  index: number;
  bucket_size: number;
};

export default function Model(props: AudioReactiveModelProps) {
  const { useAAStore, index, bucket_size } = props;

  const group = useRef<THREE.Group>();
  const boxGroup = useRef<THREE.Group>();
  const material = useRef<THREE.MeshStandardMaterial>();

  const aa = useAAStore((st) => st.audioAnalyser);

  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (group.current) {
      const freq_data = aa?.getFrequencyData()[index]
        ? aa?.getFrequencyData()[index] / 10
        : 0;
      group.current.scale.y = 2 + freq_data;
    }
    if (material.current) {
      const { x: xRot, y: yRot, z: zRot } = camera.rotation;

      const h = (xRot + clock.getElapsedTime() / 10) % 1;
      const s = (yRot + clock.getElapsedTime() / 7) % 1;
      const l = (zRot + clock.getElapsedTime() / 5) % 1;

      material.current.color.setHSL(h, s * 0.4 + 0.4, l * 0.4 + 0.4);
    }
  });

  const rotFactor = index / bucket_size;

  return (
    <group rotation-y={rotFactor} position-y={-0.2}>
      <group
        ref={group}
        {...props}
        dispose={null}
        rotation={[rotFactor * 0.16, rotFactor, 0]}
      >
        <group ref={boxGroup} scale={[200, 200, 200]}>
          <group position={[0, 0, -0.01]}>
            <mesh receiveShadow castShadow>
              <boxGeometry args={[0.04, 0.02, 0.02]} attach="geometry" />
              <meshStandardMaterial
                ref={material}
                color="white"
                attach="material"
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
