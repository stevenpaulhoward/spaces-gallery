/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";
import { ModelProps } from "../types/model";
import { loadModel } from "../services/loader";
import { BufferGeometry } from "three";
import { useConvexPolyhedron } from "use-cannon";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
  };
  materials: {
    Sphere: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: ModelProps) {
  const { useEnvStore } = props;
  const setLoading = useEnvStore((st) => st.setLoading);
  const group = useRef<THREE.Group>();
  const sphereGroup = useRef<THREE.Group>();
  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/models/SpacesSphere1/SpacesSphere1.glb",
    loadModel(setLoading)
  );

  materials.Sphere.metalness = 1;
  materials.Sphere.refractionRatio = 0.9;
  materials.Sphere.roughness = 0.35;

  const wallsGeo = useMemo(() => {
    return new THREE.Geometry().fromBufferGeometry(
      nodes.Sphere.geometry as BufferGeometry
    );
  }, [nodes]);
  const [wallsHitbox] = useConvexPolyhedron(() => ({
    type: "Static",
    args: wallsGeo.clone().translate(0, 0.02, 0).scale(100, 100, 100),
  }));

  useFrame(({ clock }) => {
    if (sphereGroup.current) {
      sphereGroup.current.position.y =
        0.1 * 2 * Math.sin(clock.getElapsedTime() * 0.5);

      sphereGroup.current.rotation.y = clock.getElapsedTime() / 5;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={sphereGroup} scale={[100, 100, 100]}>
        <group position={[0, 0.02, 0]}>
          <mesh
            material={materials.Sphere}
            geometry={nodes.Sphere.geometry}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}
