/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { loadModel } from "../services/loader";
import { ModelProps } from "../types/model";
import { BufferGeometry } from "three";
import { useConvexPolyhedron } from "use-cannon";

type GLTFResult = GLTF & {
  nodes: {
    GALLERYFULL: THREE.Mesh;
    ROOFLIP2: THREE.Mesh;
    GALLERYWALLS: THREE.Mesh;
    ROOFLIP1: THREE.Mesh;
    GALLERYFLOOR: THREE.Mesh;
  };
};

export default function Model(props: ModelProps) {
  const { useEnvStore } = props;
  const setLoading = useEnvStore((st) => st.setLoading);
  const group = useRef<THREE.Group>();
  const { nodes } = useLoader<GLTFResult>(
    GLTFLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/models/SpacesGallery10/SpacesGallery10.glb",
    loadModel(setLoading)
  );

  // materials["INSIDE"].metalness = 0.4;
  // // materials["INSIDE"].refractionRatio = 0.3;
  // materials["INSIDE"].side = THREE.DoubleSide;

  const floorGeo = useMemo(() => {
    return new THREE.Geometry().fromBufferGeometry(
      nodes.GALLERYFLOOR.geometry as BufferGeometry
    );
  }, [nodes]);
  const [floorHitbox] = useConvexPolyhedron(() => ({
    type: "Static",
    args: floorGeo.clone().scale(100, 100, 100).translate(0, 0.5, 0),
  }));

  const wallsGeo = useMemo(() => {
    return new THREE.Geometry().fromBufferGeometry(
      nodes.GALLERYWALLS.geometry as BufferGeometry
    );
  }, [nodes]);
  const [wallsHitbox] = useConvexPolyhedron(() => ({
    type: "Static",
    args: wallsGeo.clone().scale(100, 100, 100).translate(0, 0.5, 0),
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0.5, 0]} scale={[100, 100, 100]}>
        <mesh
          material={nodes.GALLERYFULL.material}
          geometry={nodes.GALLERYFULL.geometry}
        />
        <mesh
          material={nodes.ROOFLIP2.material}
          geometry={nodes.ROOFLIP2.geometry}
          position={[0, 0.070056, 0]}
        />
        <mesh
          material={nodes.ROOFLIP1.material}
          geometry={nodes.ROOFLIP1.geometry}
          position={[0, 0.070056, 0]}
        />
      </group>
    </group>
  );
}
