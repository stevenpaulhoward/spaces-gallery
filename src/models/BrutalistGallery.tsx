/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";
import { loadModel } from "../services/loader";
import { ModelProps } from "../types/model";
import { useTrimeshCollision } from "../services/collision";
import { BufferGeometry } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Collision: THREE.Mesh;
    glass: THREE.Mesh;
    roof: THREE.Mesh;
    ["walls-far"]: THREE.Mesh;
    ["door-rail-walls"]: THREE.Mesh;
    floor: THREE.Mesh;
    columns: THREE.Mesh;
    ground: THREE.Mesh;
    frame: THREE.Mesh;
    horizontal: THREE.Mesh;
    ["walls-ground-level"]: THREE.Mesh;
    ["Plato-A"]: THREE.Mesh;
    ["Plato-B"]: THREE.Mesh;
    ["Plato-C"]: THREE.Mesh;
    ["Plato-D"]: THREE.Mesh;
    ["Stairs-A"]: THREE.Mesh;
    ["Stairs-B"]: THREE.Mesh;
    ["Stairs-C"]: THREE.Mesh;
  };
  materials: {
    glass: THREE.MeshStandardMaterial;
    roof: THREE.MeshStandardMaterial;
    ["walls-far"]: THREE.MeshStandardMaterial;
    ["door-rail-walls"]: THREE.MeshStandardMaterial;
    floor: THREE.MeshStandardMaterial;
    columns: THREE.MeshStandardMaterial;
    ground: THREE.MeshStandardMaterial;
    frame: THREE.MeshStandardMaterial;
    horizontal: THREE.MeshStandardMaterial;
    ["walls-ground-level"]: THREE.MeshStandardMaterial;
    ["Plato-A"]: THREE.MeshStandardMaterial;
    ["Plato-B"]: THREE.MeshStandardMaterial;
    ["Plato-C"]: THREE.MeshStandardMaterial;
    ["Plato-D"]: THREE.MeshStandardMaterial;
    ["Stairs-A"]: THREE.MeshStandardMaterial;
    ["Stairs-B"]: THREE.MeshStandardMaterial;
    ["Stairs-C"]: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: ModelProps) {
  const { useEnvStore } = props;

  const setLoading = useEnvStore((st) => st.setLoading);
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    "https://d27rt3a60hh1lx.cloudfront.net/models/BrutalistGallery3/BrutalistGallery3.glb",
    loadModel(setLoading)
  );

  useTrimeshCollision(
    (nodes.Collision.geometry as BufferGeometry)
      .clone()
      .translate(-8.883761, -3.433639, 7.782213)
      .translate(0, 3.98, 0)
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 3.98, 0]}>
        <mesh
          material={nodes.Collision.material}
          geometry={nodes.Collision.geometry}
          position={[-8.883761, -3.433639, 7.782213]}
        />
        <mesh
          material={materials.glass}
          geometry={nodes.glass.geometry}
          position={[-9.327085, 3.442923, 9.929964]}
        />
        <mesh
          material={materials.roof}
          geometry={nodes.roof.geometry}
          position={[-9.350093, 5.921006, -3.185983]}
        />
        <mesh
          material={materials["walls-far"]}
          geometry={nodes["walls-far"].geometry}
          position={[-8.142455, 9.968623, 21.273808]}
        />
        <mesh
          material={materials["door-rail-walls"]}
          geometry={nodes["door-rail-walls"].geometry}
          position={[-9.331779, -0.269577, 8.944376]}
        />
        <mesh
          material={materials.floor}
          geometry={nodes.floor.geometry}
          position={[-9.333344, -3.250827, 0.71996]}
        />
        <mesh
          material={materials.columns}
          geometry={nodes.columns.geometry}
          position={[-9.333344, -4.132077, 9.918971]}
        />
        <mesh
          material={materials.ground}
          geometry={nodes.ground.geometry}
          position={[-9.333344, -3.982077, 4.368971]}
        />
        <mesh
          material={materials.frame}
          geometry={nodes.frame.geometry}
          position={[-9.333344, 5.017923, 13.209597]}
        />
        <mesh
          material={materials.horizontal}
          geometry={nodes.horizontal.geometry}
          position={[-9.330215, 3.105423, 10.747125]}
        />
        <mesh
          material={materials["walls-ground-level"]}
          geometry={nodes["walls-ground-level"].geometry}
          position={[-25.533344, 1.867923, 19.51897]}
        />
        <mesh
          material={materials["Plato-A"]}
          geometry={nodes["Plato-A"].geometry}
          position={[-8.433345, -3.982077, 16.668972]}
        />
        <mesh
          material={materials["Plato-B"]}
          geometry={nodes["Plato-B"].geometry}
          position={[-8.433345, -3.982077, 16.668972]}
        />
        <mesh
          material={materials["Plato-C"]}
          geometry={nodes["Plato-C"].geometry}
          position={[-8.433345, -3.982077, 16.668972]}
        />
        <mesh
          material={materials["Plato-D"]}
          geometry={nodes["Plato-D"].geometry}
          position={[-8.433345, -3.982077, 16.668972]}
        />
        <mesh
          material={materials["Stairs-A"]}
          geometry={nodes["Stairs-A"].geometry}
          position={[-9.333345, -5.182077, 15.618972]}
        />
        <mesh
          material={materials["Stairs-B"]}
          geometry={nodes["Stairs-B"].geometry}
          position={[-9.333345, -5.182077, 15.618972]}
        />
        <mesh
          material={materials["Stairs-C"]}
          geometry={nodes["Stairs-C"].geometry}
          position={[-9.333345, -2.519577, -2.929051]}
        />
      </group>
    </group>
  );
}
